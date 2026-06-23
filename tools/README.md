# tools / 发布工具

本目录包含发布站点时使用的辅助脚本。

## cache-bust.ps1 —— 解决浏览器缓存问题

### 背景

本站是纯静态网站，HTML 直接引用固定路径的 CSS / JS：

```html
<link rel="stylesheet" href="assets/css/style.css">
<script src="assets/js/main.js"></script>
```

发布后，由于 URL 一直没变，**浏览器会复用本地缓存**，导致客户端看到的还是旧版页面/样式/脚本。

`cache-bust.ps1` 通过给所有本地 CSS / JS 引用追加 `?v=<时间戳>` 查询参数解决这个问题：

```html
<link rel="stylesheet" href="assets/css/style.css?v=20260622103045">
<script src="assets/js/main.js?v=20260622103045"></script>
```

只要发布前跑一次脚本，所有资源 URL 都会带上当前时间戳，浏览器会判定为新资源并重新下载。

### 用法

在仓库根目录下执行：

```powershell
# 用当前时间戳作为版本号（推荐）
powershell -ExecutionPolicy Bypass -File .\tools\cache-bust.ps1

# 自定义版本号
powershell -ExecutionPolicy Bypass -File .\tools\cache-bust.ps1 -Version "1.2.3"

# 用 git short hash 作为版本号
powershell -ExecutionPolicy Bypass -File .\tools\cache-bust.ps1 -Version (git rev-parse --short HEAD)
```

脚本会：
- 扫描所有 `.html` 文件（排除 `node_modules`、`.git`）
- 对 `href="assets/..."` 和 `src="assets/..."` 形式的本地 CSS / JS 引用追加/更新版本号
- **外部 URL**（Google Fonts、百度地图等以 `http://` `https://` `//` 开头的）**不会被改动**
- 文件以 UTF-8 无 BOM 写回

### 推荐工作流

```powershell
# 1. 修改代码、提交
git add .
git commit -m "feat: xxx"

# 2. 发布前打版本号
powershell -ExecutionPolicy Bypass -File .\tools\cache-bust.ps1

# 3. 把整个目录上传到服务器
```

---

## 配合服务器缓存头（强烈建议）

光在 HTML 里加版本号还不够，最佳实践是配合服务器层面的 `Cache-Control` 头：

| 资源 | 策略 | 原因 |
|------|------|------|
| `*.html` | `no-cache` 或 `max-age=0, must-revalidate` | HTML 必须每次都拿最新的，里面写着资源版本号 |
| `assets/**/*.css\|js\|jpg\|png\|svg\|woff2` | `public, max-age=31536000, immutable` | 带版本号的资源可以放心长缓存一整年 |

### Nginx 示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/setra_shop;

    # HTML 不缓存
    location ~* \.html$ {
        add_header Cache-Control "no-cache, must-revalidate" always;
        expires off;
    }

    # 带版本号的静态资源：长缓存一年
    location ^~ /assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable" always;
        expires 1y;
    }
}
```

### IIS 示例（web.config）

```xml
<configuration>
  <system.webServer>
    <staticContent>
      <clientCache cacheControlMode="UseMaxAge" cacheControlMaxAge="365.00:00:00" />
    </staticContent>
    <httpProtocol>
      <customHeaders>
        <add name="Cache-Control" value="public, max-age=31536000, immutable" />
      </customHeaders>
    </httpProtocol>
    <rewrite>
      <outboundRules>
        <rule name="HtmlNoCache" preCondition="IsHtml">
          <match serverVariable="RESPONSE_Cache_Control" pattern=".*" />
          <action type="Rewrite" value="no-cache, must-revalidate" />
        </rule>
        <preConditions>
          <preCondition name="IsHtml">
            <add input="{RESPONSE_Content_Type}" pattern="^text/html" />
          </preCondition>
        </preConditions>
      </outboundRules>
    </rewrite>
  </system.webServer>
</configuration>
```

### Apache 示例（.htaccess）

```apache
<IfModule mod_headers.c>
    <FilesMatch "\.html$">
        Header set Cache-Control "no-cache, must-revalidate"
    </FilesMatch>
    <FilesMatch "\.(css|js|jpg|jpeg|png|gif|svg|woff|woff2|ttf)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>
</IfModule>
```

---

## 双保险：HTML 中已加 no-cache meta

为防止有些场景拿不到服务器配置权限，所有 HTML 的 `<head>` 中已经加了：

```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

这是辅助手段，**对部分浏览器有效，但对 CDN / 反向代理无效**。最终还是推荐用服务器端 `Cache-Control` 头作为最权威的来源。
