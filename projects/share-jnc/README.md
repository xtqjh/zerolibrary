## ng-share-jnc

### 安装
`npm i ng-share-jnc`

### 依赖三方
```ts
  "moment": "^2.22.2",
  "ngx-malihu-scrollbar": "^1.3.2",
  "ngx-image-cropper": "^1.0.1",
  "xlsx": "^0.14.1",
```

### 引入 - AppModule
```ts
  imports: [
    ...
    NgShareJncModule.forRoot({ GatewayUrl: environment.GatewayUrl }),
    OR
    NgShareJncModule.forRoot({ GatewayUrl: environment.GatewayUrl, Production: environment.Production, DebugToken: environment.DebugToken }),
    ...
  ]
```

### 配置 - angular.json
```ts
  "styles": [
    ...
    "node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css"
    ...
  ],
  "scripts": [
    ...
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js"
    ...
  ]
```

