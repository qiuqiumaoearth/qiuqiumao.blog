---
title: facebook广告投放API接口
date: 2026-05-07T09:19:00.000Z
updated: 2026-05-07T12:33:00.000Z
---

# Facebook 广告投放 API 教程


## 1. 什么是 Facebook 广告投放 API？


Facebook 广告投放 API（Marketing API）是 Facebook 提供的一套接口，用于程序化地管理和优化广告投放。通过 API，你可以：

- **创建广告账户、广告系列、广告组和广告**
- **批量管理广告素材和受众**
- **获取广告报告和数据分析**
- **自动化广告投放和预算优化**

简单来说，如果你每天投放大量广告，手动操作难以高效，API 可以帮你自动化这些流程。



## 2. API 的主要功能


| 功能分类   | 功能描述                      |
| ------ | ------------------------- |
| 广告账户管理 | 获取账户列表、余额、权限              |
| 广告系列管理 | 创建/修改广告系列（Campaigns）      |
| 广告组管理  | 管理广告组（Ad Sets），设置预算、受众、排期 |
| 广告创意管理 | 上传图片/视频、创建广告素材            |
| 数据统计   | 获取广告表现数据（点击率、转化率等）        |
| 自动化    | 批量操作广告，提高投放效率             |



## 3. 获取 Facebook 广告 API 的步骤


### 步骤 1：创建 Facebook 开发者账号

1. 打开 [Facebook for Developers](https://developers.facebook.com/)
2. 使用你的 Facebook 账号注册为开发者
3. 填写公司信息和联系方式


### 步骤 2：创建 App

1. 在开发者后台点击 **My Apps → Create App**
2. 选择 **Business** 类型
3. 填写 App 名称和联系邮箱，点击 **Create App ID**


### 步骤 3：获取 Access Token

1. 在 App 设置中，进入 **Marketing API → Tools → Access Token Tool**
2. 选择对应的广告账户权限（ads_management、ads_read）
3. 生成 **长期有效 Token**（用于服务器调用）
> ⚠️ 提示：短期 token 有效期只有 1-2 小时，推荐生成长期 token 或使用 OAuth 刷新机制


### 步骤 4：获取广告账户 ID

1. 使用 Graph API Explorer 测试请求：

```plain text
GET /me/adaccounts
```

1. 返回广告账户 ID，例如 `act_1234567890`
2. 在 API 调用中需要使用此 ID


### 步骤 5：创建广告系列


请求示例（Python）：


```python
import requests

access_token = '你的AccessToken'
ad_account_id = 'act_1234567890'
url = f'https://graph.facebook.com/v17.0/{ad_account_id}/campaigns'

params = {
    'name': '测试广告系列',
    'objective': 'LINK_CLICKS',
    'status': 'PAUSED',
    'access_token': access_token
}

response = requests.post(url, data=params)
print(response.json())
```



### 步骤 6：创建广告组和广告

- 广告组（Ad Set）可以设置受众、预算、排期
- 广告（Ad）可以上传图片/视频，设置文案和落地页

示例 API 请求可参考官方文档：[Marketing API Reference](https://developers.facebook.com/docs/marketing-api/)



### 步骤 7：获取广告数据

1. 使用 API 查询广告表现：

```plain text
GET /act_{ad_account_id}/insights?fields=impressions,clicks,spend
```

1. 获取数据后可以做报表或自动优化


## 4. 注意事项

- **权限管理**：确保 Access Token 拥有 ads_management 权限
- **调用频率限制**：API 有速率限制，批量操作需注意
- **数据延迟**：广告数据通常有 15 分钟到 24 小时延迟
- **安全**：不要泄露 Access Token，生产环境使用服务器安全存储


## 5. 总结


通过 Facebook 广告投放 API，你可以完全程序化地管理广告，提高效率，降低人工操作成本。掌握 API 调用、Access Token 获取以及广告结构后，就可以实现广告批量创建、优化和自动化投放。