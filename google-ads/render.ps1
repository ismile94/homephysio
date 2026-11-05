# Renders every Google Ads image in output/ (and the website's public/og-image.jpg)
# from the HTML templates, using Microsoft Edge in headless mode.
#
#   Run from this folder:   powershell -ExecutionPolicy Bypass -File .\render.ps1
#
# Edit the photos in photos/ or the text in templates/banner.html, then re-run.
# Needs an internet connection (the Inter font loads from Google Fonts).

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = $PSScriptRoot
$edge = @(
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $edge) { throw 'Microsoft Edge not found.' }

$tmp = Join-Path $env:TEMP 'physiovisit-ads'
New-Item -ItemType Directory -Force $tmp | Out-Null

# template, query, width, height, output (relative to this folder), format
$jobs = @(
  # Responsive display / Performance Max / Demand Gen - clean photos, no text
  @('photo',  'src=living-room.jpg&pos=center',     1200, 628,  'output/responsive-display/landscape-1200x628-living-room.jpg', 'jpg'),
  @('photo',  'src=crutches.jpg&pos=center',        1200, 628,  'output/responsive-display/landscape-1200x628-crutches.jpg', 'jpg'),
  @('photo',  'src=hallway.jpg&pos=50% 40%',        1200, 628,  'output/responsive-display/landscape-1200x628-hallway.jpg', 'jpg'),
  @('photo',  'src=hallway.jpg&pos=center',         1200, 1200, 'output/responsive-display/square-1200x1200-hallway.jpg', 'jpg'),
  @('photo',  'src=sit-to-stand.jpg&pos=50% 45%',   1200, 1200, 'output/responsive-display/square-1200x1200-sit-to-stand.jpg', 'jpg'),
  @('photo',  'src=living-room.jpg&pos=68% center', 1200, 1200, 'output/responsive-display/square-1200x1200-living-room.jpg', 'jpg'),
  @('photo',  'src=sit-to-stand.jpg&pos=center',    960,  1200, 'output/responsive-display/portrait-960x1200-sit-to-stand.jpg', 'jpg'),
  @('photo',  'src=hallway.jpg&pos=center',         960,  1200, 'output/responsive-display/portrait-960x1200-hallway.jpg', 'jpg'),

  # Logos
  @('logo',   'layout=square',    400,  400, 'output/logos/logo-square-400x400.png', 'png'),
  @('logo',   'layout=landscape', 1200, 300, 'output/logos/logo-landscape-1200x300.png', 'png'),

  # Uploaded display banners - desktop
  @('banner', 'src=living-room.jpg&pos=62% center', 970, 250, 'output/display-banners/desktop/billboard-970x250.jpg', 'jpg'),
  @('banner', 'src=living-room.jpg&pos=60% center', 970, 90,  'output/display-banners/desktop/large-leaderboard-970x90.jpg', 'jpg'),
  @('banner', 'src=living-room.jpg&pos=60% center', 728, 90,  'output/display-banners/desktop/leaderboard-728x90.jpg', 'jpg'),
  @('banner', 'src=living-room.jpg&pos=60% center', 468, 60,  'output/display-banners/desktop/banner-468x60.jpg', 'jpg'),
  @('banner', 'src=sit-to-stand.jpg&pos=50% 40%',   300, 600, 'output/display-banners/desktop/half-page-300x600.jpg', 'jpg'),
  @('banner', 'src=sit-to-stand.jpg&pos=45% 40%',   160, 600, 'output/display-banners/desktop/wide-skyscraper-160x600.jpg', 'jpg'),
  @('banner', 'src=hallway.jpg&pos=50% 25%',        336, 280, 'output/display-banners/desktop/large-rectangle-336x280.jpg', 'jpg'),
  @('banner', 'src=hallway.jpg&pos=50% 25%',        300, 250, 'output/display-banners/desktop/medium-rectangle-300x250.jpg', 'jpg'),
  @('banner', 'src=living-room.jpg&pos=65% 30%',    250, 250, 'output/display-banners/desktop/square-250x250.jpg', 'jpg'),

  # Uploaded display banners - mobile
  @('banner', '',                                   320, 50,  'output/display-banners/mobile/mobile-leaderboard-320x50.jpg', 'jpg'),
  @('banner', '',                                   320, 100, 'output/display-banners/mobile/large-mobile-banner-320x100.jpg', 'jpg'),
  @('banner', 'src=hallway.jpg&pos=50% 25%',        300, 250, 'output/display-banners/mobile/medium-rectangle-300x250.jpg', 'jpg'),
  @('banner', 'src=sit-to-stand.jpg&pos=50% 40%',   320, 480, 'output/display-banners/mobile/interstitial-320x480.jpg', 'jpg'),

  # Website social-share image (Facebook, WhatsApp, LinkedIn previews)
  @('banner', 'layout=og&src=living-room.jpg&pos=62% center', 1200, 630, '../public/og-image.jpg', 'jpg')
)

function Save-Image($bitmap, $path, $format, $quality) {
  if ($format -eq 'png') {
    $bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    return
  }
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $params = New-Object System.Drawing.Imaging.EncoderParameters 1
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$quality)
  $bitmap.Save($path, $codec, $params)
}

$i = 0
foreach ($job in $jobs) {
  $i++
  $template, $query, $w, $h, $out, $format = $job
  $outPath = [IO.Path]::GetFullPath((Join-Path $root $out))
  New-Item -ItemType Directory -Force (Split-Path $outPath) | Out-Null

  $file = (Join-Path $root "templates/$template.html") -replace '\\', '/'
  $url = "file:///$file`?w=$w&h=$h&$query"
  $shot = Join-Path $tmp "shot-$i.png"
  if (Test-Path $shot) { Remove-Item $shot }

  # Edge enforces a minimum window size, so render larger and crop to the exact size.
  $winW = [Math]::Max($w, 600); $winH = [Math]::Max($h, 300)
  Start-Process -FilePath $edge -Wait -ArgumentList @(
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--allow-file-access-from-files', "--user-data-dir=$tmp\profile",
    "--window-size=$winW,$winH", '--virtual-time-budget=6000', "--screenshot=$shot", "`"$url`""
  )
  if (-not (Test-Path $shot)) { Write-Warning "Render failed: $out"; continue }

  $full = [System.Drawing.Bitmap]::FromFile($shot)
  $crop = $full.Clone((New-Object System.Drawing.Rectangle 0, 0, $w, $h), [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $full.Dispose()

  # Uploaded image ads must be 150 KB or smaller.
  $limit = if ($out -like '*display-banners*') { 150KB } else { 5MB }
  $quality = 90
  do {
    Save-Image $crop $outPath $format $quality
    $size = (Get-Item $outPath).Length
    $quality -= 5
  } while ($format -eq 'jpg' -and $size -gt $limit -and $quality -ge 50)
  $crop.Dispose()

  '{0,-70} {1,5}x{2,-5} {3,7:N0} KB' -f $out, $w, $h, ($size / 1KB)
}
