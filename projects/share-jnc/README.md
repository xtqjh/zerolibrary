## share-jnc

### 安装
`npm i share-jnc`

### 依赖三方
`"moment": "^2.22.2"`
`"ngx-malihu-scrollbar": "^1.3.2"`
`"ngx-image-cropper": "^1.0.1"`
`"xlsx": "^0.14.1"`

### 引入 - AppModule
```ts
  imports: [
    ...
    NgShareJncModule.forRoot({ GatewayUrl: environment.GatewayUrl }),
    ...
  ]
```

