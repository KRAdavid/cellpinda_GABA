param(
  [Parameter(Mandatory = $true)]
  [string]$SourcePath,
  [Parameter(Mandatory = $true)]
  [string]$DestinationPath
)

Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630
$source = [System.Drawing.Image]::FromFile((Resolve-Path -LiteralPath $SourcePath))
$canvas = [System.Drawing.Bitmap]::new($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($canvas)

try {
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

  $sourceRatio = $source.Width / [double]$source.Height
  $targetRatio = $width / [double]$height
  if ($sourceRatio -gt $targetRatio) {
    $cropWidth = [int]($source.Height * $targetRatio)
    $sourceRect = [System.Drawing.Rectangle]::new([int](($source.Width - $cropWidth) / 2), 0, $cropWidth, $source.Height)
  } else {
    $cropHeight = [int]($source.Width / $targetRatio)
    $sourceRect = [System.Drawing.Rectangle]::new(0, [int](($source.Height - $cropHeight) / 2), $source.Width, $cropHeight)
  }
  $graphics.DrawImage($source, [System.Drawing.Rectangle]::new(0, 0, $width, $height), $sourceRect, [System.Drawing.GraphicsUnit]::Pixel)

  $overlayBrush = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    [System.Drawing.Point]::new(0, 0),
    [System.Drawing.Point]::new(920, 0),
    [System.Drawing.Color]::FromArgb(224, 245, 251, 253),
    [System.Drawing.Color]::FromArgb(12, 245, 251, 253)
  )
  $graphics.FillRectangle($overlayBrush, 0, 0, $width, $height)

  $ink = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(19, 47, 86))
  $mutedInk = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(78, 105, 127))
  $teal = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(14, 127, 137))
  $white = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
  $fontFamily = 'Malgun Gothic'

  $eyebrow = [System.Drawing.Font]::new($fontFamily, 18, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $title = [System.Drawing.Font]::new($fontFamily, 48, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $titleAccent = [System.Drawing.Font]::new($fontFamily, 48, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $body = [System.Drawing.Font]::new($fontFamily, 21, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $footer = [System.Drawing.Font]::new($fontFamily, 17, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)

  $graphics.DrawString('GABA GUIDE · 뇌와 우리', $eyebrow, $teal, 76, 58)
  $graphics.DrawString('수면에서 인지,', $title, $ink, 76, 138)
  $graphics.DrawString('피부·근육·성장 연구까지', $title, $ink, 76, 199)
  $graphics.DrawString('GABA를 읽는 안내서', $titleAccent, $teal, 76, 260)
  $graphics.DrawString('1950년의 발견에서 오늘의 연구 지도로', $body, $mutedInk, 78, 363)

  $rulePen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(100, 14, 127, 137), 2)
  $graphics.DrawLine($rulePen, 78, 418, 220, 418)
  $graphics.DrawString('공개 과학 정보 · 제품과 무관한 GABA 안내서', $footer, $mutedInk, 78, 446)
  $graphics.DrawString('gaba-info', $footer, $white, 1035, 574)

  $destinationFullPath = [System.IO.Path]::GetFullPath($DestinationPath)
  $directory = Split-Path -Parent $destinationFullPath
  if ($directory -and -not (Test-Path -LiteralPath $directory)) {
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
  }
  if ($destinationFullPath -match '\.(jpg|jpeg)$') {
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg' | Select-Object -First 1
    $encoderParameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
    $encoderParameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]88)
    $canvas.Save($destinationFullPath, $codec, $encoderParameters)
    $encoderParameters.Dispose()
  } else {
    $canvas.Save($destinationFullPath, [System.Drawing.Imaging.ImageFormat]::Png)
  }
}
finally {
  $graphics.Dispose()
  $canvas.Dispose()
  $source.Dispose()
}
