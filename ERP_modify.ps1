
# 定義原始文件的路徑
$filePath = "C:\Users\User\Documents\GitHub\BIM-System\dist\index.html"

Write-Host "Start modify $filePath"

# 讀取原始文件的內容，並指定編碼為 UTF-8
$content = Get-Content -Path $filePath -Raw -Encoding UTF8

# 定義要替換的內容
$replacementMap = @{
    '<link rel="icon" href="/favicon.ico">' = '<link rel="icon" href="/Content/favicon.ico">'
    '<script defer="defer" src="/js/' = '<script defer="defer" src="/Content/js/'
    '<link href="/css/' = '<link href="/Content/css/'
}

# 遍歷替換字典，將原始文件中的特定內容替換為新的內容
foreach ($key in $replacementMap.Keys) {
    $content = $content -replace [regex]::Escape($key), $replacementMap[$key]
}

# 將修改後的內容寫回到原始文件，並指定編碼為 UTF-8
Set-Content -Path $filePath -Value $content -Encoding UTF8

Write-Host "Modified $filePath Successfully"

# 定義來源路徑&目標路徑
$sourcePath = "C:\Users\User\Documents\GitHub\BIM-System\dist"
$directoryPath = "C:\Users\User\Documents\GitHub\BimfmAssetSystem\project\Bimfm_AssetSystem\Content"

# 刪除 index.html 文件
Remove-Item -Path "$directoryPath\index.html" -Force

# 刪除 css 資料夾及其內容
Remove-Item -Path "$directoryPath\css" -Recurse -Force

# 刪除 js 資料夾及其內容
Remove-Item -Path "$directoryPath\js" -Recurse -Force


Write-Host "Remove original css folder, js folder and index.html Successfully."

# 複製 index.html 文件
Copy-Item -Path "$sourcePath\index.html" -Destination $directoryPath -Force

# 複製 css 資料夾及其內容
Copy-Item -Path "$sourcePath\css" -Destination "$directoryPath\css" -Recurse -Force

# 複製 js 資料夾及其內容
Copy-Item -Path "$sourcePath\js" -Destination "$directoryPath\js" -Recurse -Force

Write-Host "Copy new css folder, js folder and index.html Successfully."

pause