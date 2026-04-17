---
title: Notion 同步到博客方案设计
date: 2026-04-12T13:32:00.000Z
updated: 2026-04-16T14:51:00.000Z
---

# Notion 同步到博客方案设计


💡 **适合人群**：会一些 Python 和前端的小白  
⏱️ **总耗时**：约 35 分钟  
🎯 **最终效果**：在 Notion 勾选框 → 博客自动更新



## 📚 第一部分：理解整个流程（5分钟阅读）


### 🤔 你现在的问题是什么？

- ✍️ 在 Notion 写笔记很舒服（格式好看、功能强大）
- 😫 但想让笔记显示在博客上很麻烦（要复制粘贴、转格式）
- 🔄 每次更新文章都要重复操作

### 💡 解决方案是什么？


**用大白话说**：

1. 在 Notion 数据库里加个"是否展示"的勾选框
2. 勾选后，GitHub 会自动帮你把 Notion 内容转成 Markdown
3. 然后自动放到你的博客里

**就像**：


```plain text
你在 Notion 勾个框
    ↓
机器人自动搬运（GitHub Actions）
    ↓
博客自动更新
```


### 🔄 自动化是怎么工作的？


```plain text
【每天凌晨 2 点】
    ↓
GitHub 自动醒来："该干活了！"
    ↓
GitHub 问 Notion："哪些文章勾选了'是否展示'？"
    ↓
Notion 回答："这 5 篇勾选了"
    ↓
GitHub 把这 5 篇转成 Markdown 格式
    ↓
GitHub 自动提交到你的博客仓库
    ↓
博客自动部署，用户看到新文章 🎉
```


### 📋 需求分析


**目标**：将 Notion 笔记自动同步到 VitePress 博客


**核心需求**：

1. 在 Notion 中添加"是否展示"属性（Checkbox）
2. 勾选后自动同步到博客
3. 保持 Notion 的编辑体验
4. 博客自动更新


## 🎯 方案选择


### 方案对比


| 方案                                   | 优点      | 缺点   | 推荐度   |
| ------------------------------------ | ------- | ---- | ----- |
| **方案 A：Notion API + GitHub Actions** | 全自动化，免费 | 需要配置 | ⭐⭐⭐⭐⭐ |
| 方案 B：手动导出                            | 简单      | 太麻烦  | ⭐⭐☆☆☆ |
| 方案 C：第三方工具（如 Notion2MD）              | 开箱即用    | 可能收费 | ⭐⭐⭐☆☆ |


**推荐方案 A**：使用 Notion API + GitHub Actions 实现自动同步



## 🏗️ 方案 A：自动化同步架构


### 架构图


```plain text
Notion 数据库
    ↓
Notion API（读取勾选的文章）
    ↓
转换脚本（Notion → Markdown）
    ↓
GitHub Actions（定时执行）
    ↓
提交到 Git 仓库
    ↓
自动部署到博客
```



## 📝 实施步骤


### 第一步：配置 Notion 数据库


### 1.1 创建 Notion 数据库


在 Notion 中创建一个数据库，包含以下属性：


| 属性名      | 类型               | 说明              |
| -------- | ---------------- | --------------- |
| **标题**   | Title            | 文章标题            |
| **是否展示** | Checkbox         | ✅ 勾选后同步到博客      |
| **分类**   | Select           | 文章分类（前端/后端/算法等） |
| **标签**   | Multi-select     | 文章标签            |
| **创建时间** | Created time     | 自动生成            |
| **更新时间** | Last edited time | 自动生成            |
| **状态**   | Select           | 草稿/已发布          |


![bdf2fe13-c4db-471b-a6a4-3f1094081814.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8170a486-c3e7-811a-9ea1-00037f488e6b/73b18f8e-3219-4733-b7d2-9915e346f4f1/bdf2fe13-c4db-471b-a6a4-3f1094081814.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625IMBNKH%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T181350Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDNwBQ%2BnvLXvxQfr9oPCRqqneBw9hxW6qT3kScwWB%2FqSgIhAKlzs%2BpnyUjAOKS3F%2F4JlE0Np3k4YnlP%2Bz5Yq8XT%2FFBZKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzgNfemwKNfOeho3l8q3AP95UIIrRYXbXdhsv6VacPLsetg%2Fbpq6JvfANgKCrl732zKNztDOdhSGV7WQgrQQmiei7ttRw%2BrNXKLwmM7qLvTVtj2wtQDIM3PBuPGgEyqbA1aYxcEu0A6yCtvO1t1C1qwSpeblSm%2F0Fvjox3cLV%2FUZ6Km3qTYUGNJlFflYp9MY1zx%2FOfctaFVwcRTk8%2F4qIyuBSjoyqHUp1eseY8JTaDGuqX6ioecQu6Uj8m4J%2FliIndeShHoUqMMX7N9uBkUEqGTwKMepsWqjsQCJkWMmxvn%2BLeREYkk6M55GR50TaJ%2BJ%2FRr9yrjkdDdszIiZAFpnqC68EaoBK%2Bh%2FfOkU0hI0s4iuHwUCCV1RoZtEitpKbejLDtmohE49%2B15kgzjQ8TsVPNNZcD6qas3lyn0Fgjjlaa%2FOoAUEkBdhsCFcgO%2BPaoolYi8VQ4PxGa6eG%2FFkKaQpd1%2Fz7X1SCg1yXJ0mrYxTuFYyqGoRfbM9ax6ND0utZSO5aTY5MDPP8dnrYrvSB93lJNAnbUT95qHE1qGs%2FU%2FpLlGiUL%2F%2Bt2Qa6vMlV537%2BYwRStEQ6%2FI2hkOqoGLl%2B2N%2B44VfiRjATkV4X1aU2k9qq4ljSsLR0ZHdOUMcwSAlfseYPbCfLZAjYrtVjp3cDDz0onPBjqkAVNivCW1DVaY76oRwHo%2FIbF%2B1Py4TbEpItAXCZINMbzUZPN9HGw3UapFwwgKZJFIurvb7By%2FvtYMu9eWqagG6b5qTvlPabQOFNM0zKzBU%2FFKJIqr8rQs3iPrboTUPp3ewfuH5d9XH%2FhgZKqLoYGpQ%2Bnptx7aRR%2FA1mSbCa9e%2Bpy%2FfDLQNp92h6RqatQtVXF6g6WCyTaK900z4a1OK7Y7qK6vAH%2BZ&X-Amz-Signature=96eb45ea7fbcf135312735c7f410a24396342c7eb0425a4117fe5ecd5cd169c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


### 1.2 获取 Notion 集成密钥

1. 访问 [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. 点击"New integration"
3. 填写信息：
    - Name: `博客同步`
    - Associated workspace: 选择你的工作区
    - Capabilities: 勾选 `Read content`
4. 点击"Submit"，复制 `Internal Integration Token`

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8170a486-c3e7-811a-9ea1-00037f488e6b/ccaf6679-1833-4e88-8b38-e1e35045cdef/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625IMBNKH%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T181353Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDNwBQ%2BnvLXvxQfr9oPCRqqneBw9hxW6qT3kScwWB%2FqSgIhAKlzs%2BpnyUjAOKS3F%2F4JlE0Np3k4YnlP%2Bz5Yq8XT%2FFBZKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzgNfemwKNfOeho3l8q3AP95UIIrRYXbXdhsv6VacPLsetg%2Fbpq6JvfANgKCrl732zKNztDOdhSGV7WQgrQQmiei7ttRw%2BrNXKLwmM7qLvTVtj2wtQDIM3PBuPGgEyqbA1aYxcEu0A6yCtvO1t1C1qwSpeblSm%2F0Fvjox3cLV%2FUZ6Km3qTYUGNJlFflYp9MY1zx%2FOfctaFVwcRTk8%2F4qIyuBSjoyqHUp1eseY8JTaDGuqX6ioecQu6Uj8m4J%2FliIndeShHoUqMMX7N9uBkUEqGTwKMepsWqjsQCJkWMmxvn%2BLeREYkk6M55GR50TaJ%2BJ%2FRr9yrjkdDdszIiZAFpnqC68EaoBK%2Bh%2FfOkU0hI0s4iuHwUCCV1RoZtEitpKbejLDtmohE49%2B15kgzjQ8TsVPNNZcD6qas3lyn0Fgjjlaa%2FOoAUEkBdhsCFcgO%2BPaoolYi8VQ4PxGa6eG%2FFkKaQpd1%2Fz7X1SCg1yXJ0mrYxTuFYyqGoRfbM9ax6ND0utZSO5aTY5MDPP8dnrYrvSB93lJNAnbUT95qHE1qGs%2FU%2FpLlGiUL%2F%2Bt2Qa6vMlV537%2BYwRStEQ6%2FI2hkOqoGLl%2B2N%2B44VfiRjATkV4X1aU2k9qq4ljSsLR0ZHdOUMcwSAlfseYPbCfLZAjYrtVjp3cDDz0onPBjqkAVNivCW1DVaY76oRwHo%2FIbF%2B1Py4TbEpItAXCZINMbzUZPN9HGw3UapFwwgKZJFIurvb7By%2FvtYMu9eWqagG6b5qTvlPabQOFNM0zKzBU%2FFKJIqr8rQs3iPrboTUPp3ewfuH5d9XH%2FhgZKqLoYGpQ%2Bnptx7aRR%2FA1mSbCa9e%2Bpy%2FfDLQNp92h6RqatQtVXF6g6WCyTaK900z4a1OK7Y7qK6vAH%2BZ&X-Amz-Signature=ccf8edf7c52228648fa2d187f519cc6163e48e5c54d3a15a845f1e6dc21e7ac7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8170a486-c3e7-811a-9ea1-00037f488e6b/d7de203c-d798-4df0-a320-b3902646c18f/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZSGOB4Y%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T181353Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJGMEQCIBaLurTvkPQ86fCgWslcSsA3wiwuFbltd2u8u3vUtfngAiBI9whJB2EMlZUuIJ7lCI2tbFGyOTKNL7ItHahHUmnkgSqIBAja%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMKKKaTNsAsx6Jh8SAKtwDiYgNgPfaXZKBlsBcE34bETIwo6iaT%2BE3DbjaNYwSLtnp1VpR5FdoYEAB%2BkUENFyDAOsdq2G5jcPiJYwl5Xss5AxFpLaGEl0rERmj0kJsucJVZ5kGXcVZL2nmGuFTe2muK%2BNZ3yWzvBjOSW%2BXq2BXRUdG%2F3f%2BZmlpePMjd9f%2Fb0DTDB3XU6PcZnsE7cHkAGbkgNJjdBdliyXZoEhIe1PBvgsvZRDJAVBJDb4gOjTjK42ntHkG2kQdzKwL83O57dPWdpo%2Fx1UuBzbWqQxGGT1HcgrkfD%2Fhu%2FFSiMNgZUKv1AGtZ2QNmIwiQ%2Fi9DzOAflfPWEBpsnz9sEZZ51QzlEI4Mo3F%2FPj4v6hUgBwXG1ysFLS%2FxzeBI7pugi7as5y1PfqXZv6NTD%2BfhLS%2FtyErI5zkFN%2F8Gc2utbVSkC%2BiL08S%2BE8QjusFpBXhxs2R9Z0UeYQQDTD6G%2Ff0uXJbMFml4zj1hPmc%2Bj21XG%2F5QAT0abPda0sEy3dVrcyR1sjQPGhTn9hldA2Xs%2BE9DiXn%2Bh%2B%2B0exeeSBOQmza1Sf2uI5C8WmkB9yZqT28JLhx%2BnUVO1zjxFM4wjLK81wg2bGHhKc8E5nbPns64nPf3ot%2BZE3NFbuna0xRT9ChMiT3MtaVzXowl9OJzwY6pgGp%2ByoZMG0SyeCX6FJfG04%2FN%2Bv7xHk%2FNmlEFOiNzaYCEgZZvJzvRSBABG6yFVVtlwr%2FF1sLtw4Okh7YuJy%2BLn5UdsZDSp9l1RkZvLgV7%2BD6IEp%2Bau5qb7t9t5G3doSqL3%2BIrP8ve5lhTNVzljtrUAFujbdqjvyOMbl9d6kEO0hpk333qCtDH1PSYO5BWU4ZipP1a0%2F8EiHsqfSRmgR8zChEfXJPvmE6&X-Amz-Signature=42622e4a2dae3cd2fa2362bfca7e3898f28c6ece40912d45297e4eb83cc2429e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


### 1.3 连接数据库到集成

1. 打开你的 Notion 数据库页面
2. 点击右上角 `...` → `Connections` → `Connect to`
3. 选择刚创建的"博客同步"集成
4. 复制数据库 URL 中的 Database ID
    - 格式：`https://notion.so/xxxxx?v=yyyyy\`
    - Database ID 就是 `xxxxx` 部分

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8170a486-c3e7-811a-9ea1-00037f488e6b/10b248ff-3644-4d34-aee6-e874c520ef0d/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625IMBNKH%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T181350Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDNwBQ%2BnvLXvxQfr9oPCRqqneBw9hxW6qT3kScwWB%2FqSgIhAKlzs%2BpnyUjAOKS3F%2F4JlE0Np3k4YnlP%2Bz5Yq8XT%2FFBZKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzgNfemwKNfOeho3l8q3AP95UIIrRYXbXdhsv6VacPLsetg%2Fbpq6JvfANgKCrl732zKNztDOdhSGV7WQgrQQmiei7ttRw%2BrNXKLwmM7qLvTVtj2wtQDIM3PBuPGgEyqbA1aYxcEu0A6yCtvO1t1C1qwSpeblSm%2F0Fvjox3cLV%2FUZ6Km3qTYUGNJlFflYp9MY1zx%2FOfctaFVwcRTk8%2F4qIyuBSjoyqHUp1eseY8JTaDGuqX6ioecQu6Uj8m4J%2FliIndeShHoUqMMX7N9uBkUEqGTwKMepsWqjsQCJkWMmxvn%2BLeREYkk6M55GR50TaJ%2BJ%2FRr9yrjkdDdszIiZAFpnqC68EaoBK%2Bh%2FfOkU0hI0s4iuHwUCCV1RoZtEitpKbejLDtmohE49%2B15kgzjQ8TsVPNNZcD6qas3lyn0Fgjjlaa%2FOoAUEkBdhsCFcgO%2BPaoolYi8VQ4PxGa6eG%2FFkKaQpd1%2Fz7X1SCg1yXJ0mrYxTuFYyqGoRfbM9ax6ND0utZSO5aTY5MDPP8dnrYrvSB93lJNAnbUT95qHE1qGs%2FU%2FpLlGiUL%2F%2Bt2Qa6vMlV537%2BYwRStEQ6%2FI2hkOqoGLl%2B2N%2B44VfiRjATkV4X1aU2k9qq4ljSsLR0ZHdOUMcwSAlfseYPbCfLZAjYrtVjp3cDDz0onPBjqkAVNivCW1DVaY76oRwHo%2FIbF%2B1Py4TbEpItAXCZINMbzUZPN9HGw3UapFwwgKZJFIurvb7By%2FvtYMu9eWqagG6b5qTvlPabQOFNM0zKzBU%2FFKJIqr8rQs3iPrboTUPp3ewfuH5d9XH%2FhgZKqLoYGpQ%2Bnptx7aRR%2FA1mSbCa9e%2Bpy%2FfDLQNp92h6RqatQtVXF6g6WCyTaK900z4a1OK7Y7qK6vAH%2BZ&X-Amz-Signature=dbf42a709ac770a3d74e00725891abf9040c75d03bcf5c0d3a941ed48ebf275b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![Database ID=7c70a486-c3e7-826e-a2e7-87c7e164facb](https://prod-files-secure.s3.us-west-2.amazonaws.com/8170a486-c3e7-811a-9ea1-00037f488e6b/bcf036d7-f725-4795-b090-917b814cf6b5/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625IMBNKH%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T181350Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDNwBQ%2BnvLXvxQfr9oPCRqqneBw9hxW6qT3kScwWB%2FqSgIhAKlzs%2BpnyUjAOKS3F%2F4JlE0Np3k4YnlP%2Bz5Yq8XT%2FFBZKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzgNfemwKNfOeho3l8q3AP95UIIrRYXbXdhsv6VacPLsetg%2Fbpq6JvfANgKCrl732zKNztDOdhSGV7WQgrQQmiei7ttRw%2BrNXKLwmM7qLvTVtj2wtQDIM3PBuPGgEyqbA1aYxcEu0A6yCtvO1t1C1qwSpeblSm%2F0Fvjox3cLV%2FUZ6Km3qTYUGNJlFflYp9MY1zx%2FOfctaFVwcRTk8%2F4qIyuBSjoyqHUp1eseY8JTaDGuqX6ioecQu6Uj8m4J%2FliIndeShHoUqMMX7N9uBkUEqGTwKMepsWqjsQCJkWMmxvn%2BLeREYkk6M55GR50TaJ%2BJ%2FRr9yrjkdDdszIiZAFpnqC68EaoBK%2Bh%2FfOkU0hI0s4iuHwUCCV1RoZtEitpKbejLDtmohE49%2B15kgzjQ8TsVPNNZcD6qas3lyn0Fgjjlaa%2FOoAUEkBdhsCFcgO%2BPaoolYi8VQ4PxGa6eG%2FFkKaQpd1%2Fz7X1SCg1yXJ0mrYxTuFYyqGoRfbM9ax6ND0utZSO5aTY5MDPP8dnrYrvSB93lJNAnbUT95qHE1qGs%2FU%2FpLlGiUL%2F%2Bt2Qa6vMlV537%2BYwRStEQ6%2FI2hkOqoGLl%2B2N%2B44VfiRjATkV4X1aU2k9qq4ljSsLR0ZHdOUMcwSAlfseYPbCfLZAjYrtVjp3cDDz0onPBjqkAVNivCW1DVaY76oRwHo%2FIbF%2B1Py4TbEpItAXCZINMbzUZPN9HGw3UapFwwgKZJFIurvb7By%2FvtYMu9eWqagG6b5qTvlPabQOFNM0zKzBU%2FFKJIqr8rQs3iPrboTUPp3ewfuH5d9XH%2FhgZKqLoYGpQ%2Bnptx7aRR%2FA1mSbCa9e%2Bpy%2FfDLQNp92h6RqatQtVXF6g6WCyTaK900z4a1OK7Y7qK6vAH%2BZ&X-Amz-Signature=6768800546781fa2a9991681777ba7258da73fea3bbbddc50f30816745076cef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![NOTION_TOKEN](https://prod-files-secure.s3.us-west-2.amazonaws.com/8170a486-c3e7-811a-9ea1-00037f488e6b/c05a0458-8985-4759-befb-b7cb1aed521a/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625IMBNKH%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T181350Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDNwBQ%2BnvLXvxQfr9oPCRqqneBw9hxW6qT3kScwWB%2FqSgIhAKlzs%2BpnyUjAOKS3F%2F4JlE0Np3k4YnlP%2Bz5Yq8XT%2FFBZKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzgNfemwKNfOeho3l8q3AP95UIIrRYXbXdhsv6VacPLsetg%2Fbpq6JvfANgKCrl732zKNztDOdhSGV7WQgrQQmiei7ttRw%2BrNXKLwmM7qLvTVtj2wtQDIM3PBuPGgEyqbA1aYxcEu0A6yCtvO1t1C1qwSpeblSm%2F0Fvjox3cLV%2FUZ6Km3qTYUGNJlFflYp9MY1zx%2FOfctaFVwcRTk8%2F4qIyuBSjoyqHUp1eseY8JTaDGuqX6ioecQu6Uj8m4J%2FliIndeShHoUqMMX7N9uBkUEqGTwKMepsWqjsQCJkWMmxvn%2BLeREYkk6M55GR50TaJ%2BJ%2FRr9yrjkdDdszIiZAFpnqC68EaoBK%2Bh%2FfOkU0hI0s4iuHwUCCV1RoZtEitpKbejLDtmohE49%2B15kgzjQ8TsVPNNZcD6qas3lyn0Fgjjlaa%2FOoAUEkBdhsCFcgO%2BPaoolYi8VQ4PxGa6eG%2FFkKaQpd1%2Fz7X1SCg1yXJ0mrYxTuFYyqGoRfbM9ax6ND0utZSO5aTY5MDPP8dnrYrvSB93lJNAnbUT95qHE1qGs%2FU%2FpLlGiUL%2F%2Bt2Qa6vMlV537%2BYwRStEQ6%2FI2hkOqoGLl%2B2N%2B44VfiRjATkV4X1aU2k9qq4ljSsLR0ZHdOUMcwSAlfseYPbCfLZAjYrtVjp3cDDz0onPBjqkAVNivCW1DVaY76oRwHo%2FIbF%2B1Py4TbEpItAXCZINMbzUZPN9HGw3UapFwwgKZJFIurvb7By%2FvtYMu9eWqagG6b5qTvlPabQOFNM0zKzBU%2FFKJIqr8rQs3iPrboTUPp3ewfuH5d9XH%2FhgZKqLoYGpQ%2Bnptx7aRR%2FA1mSbCa9e%2Bpy%2FfDLQNp92h6RqatQtVXF6g6WCyTaK900z4a1OK7Y7qK6vAH%2BZ&X-Amz-Signature=e842185ac050e97ecfd7705224f31242f1009927fe7d2129f72588834ffa4620&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



第二步：创建同步脚本


### 2.1 安装依赖


```powershell
cd D:\xuexi\qiuqiumao.blog

npm install @notionhq/client notion-to-md dotenv

# 淘宝镜像
npm install --registry=https://registry.npmmirror.com @notionhq/client notion-to-md dotenv
```


### 2.2 创建同步脚本


创建 `scripts/sync-notion.js`：


```javascript
require('dotenv').config()
const { Client } = require('@notionhq/client')
const { NotionToMarkdown } = require('notion-to-md')
const fs = require('fs')
const path = require('path')

// 初始化 Notion 客户端
const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

const n2m = new NotionToMarkdown({ notionClient: notion })

const DATABASE_ID = process.env.NOTION_DATABASE_ID

// 主函数
async function syncNotionToMarkdown() {
  console.log('🚀 开始同步 Notion 笔记...')

  try {
    // 1. 查询数据库，筛选"展示"为 true 的文章
    const response = await notion.dataSources.query({
      data_source_id: DATABASE_ID,
      filter: {
        property: '展示',
        checkbox: {
          equals: true
        }
      },
      sorts: [
        {
          property: '最后编辑',
          direction: 'descending'
        }
      ]
    })

    console.log(`📚 找到 ${response.results.length} 篇需要同步的文章`)

    // 2. 遍历每篇文章
    for (const page of response.results) {
      await syncPage(page)
    }

    console.log('✅ 同步完成！')
  } catch (error) {
    console.error('❌ 同步失败:', error.message)
    process.exit(1)
  }
}

// 同步单篇文章
async function syncPage(page) {
  const pageId = page.id

  // 获取文章属性
  const titleObj = page.properties['名称']?.title[0]?.plain_text?.trim()

  // 跳过没有标题的文章
  if (!titleObj) {
    console.log('⚠️  跳过：文章标题为空')
    return
  }

  const title = titleObj
  const createdTime = page.properties['创建时间']?.created_time
  const updatedTime = page.properties['最后编辑']?.last_edited_time

  console.log(`📝 同步文章: ${title}`)

  try {
    // 转换为 Markdown
    const mdblocks = await n2m.pageToMarkdown(pageId)
    const mdString = n2m.toMarkdownString(mdblocks)

    // 生成 frontmatter（文章头部信息）
    const frontmatter = `---
title: ${title}
date: ${createdTime}
updated: ${updatedTime}

`

    const content = frontmatter + mdString.parent

    // 保存到文件
    const fileName = `${title.replace(/[\/\\:*?"<>|]/g, '-')}.md`
    const filePath = path.join(__dirname, '../Article/note', fileName)

    fs.writeFileSync(filePath, content, 'utf-8')
    console.log(`✅ 已保存: ${fileName}`)
  } catch (error) {
    console.error(`❌ 同步文章 "${title}" 失败:`, error.message)
  }
}

// 执行同步
syncNotionToMarkdown()
```


### 2.3 创建环境变量文件


创建 `.env`（不要提交到 Git）：


```plain text
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id
```


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8170a486-c3e7-811a-9ea1-00037f488e6b/0f2fd162-e8d1-445e-90f2-12b89d891cba/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625IMBNKH%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T181350Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDNwBQ%2BnvLXvxQfr9oPCRqqneBw9hxW6qT3kScwWB%2FqSgIhAKlzs%2BpnyUjAOKS3F%2F4JlE0Np3k4YnlP%2Bz5Yq8XT%2FFBZKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzgNfemwKNfOeho3l8q3AP95UIIrRYXbXdhsv6VacPLsetg%2Fbpq6JvfANgKCrl732zKNztDOdhSGV7WQgrQQmiei7ttRw%2BrNXKLwmM7qLvTVtj2wtQDIM3PBuPGgEyqbA1aYxcEu0A6yCtvO1t1C1qwSpeblSm%2F0Fvjox3cLV%2FUZ6Km3qTYUGNJlFflYp9MY1zx%2FOfctaFVwcRTk8%2F4qIyuBSjoyqHUp1eseY8JTaDGuqX6ioecQu6Uj8m4J%2FliIndeShHoUqMMX7N9uBkUEqGTwKMepsWqjsQCJkWMmxvn%2BLeREYkk6M55GR50TaJ%2BJ%2FRr9yrjkdDdszIiZAFpnqC68EaoBK%2Bh%2FfOkU0hI0s4iuHwUCCV1RoZtEitpKbejLDtmohE49%2B15kgzjQ8TsVPNNZcD6qas3lyn0Fgjjlaa%2FOoAUEkBdhsCFcgO%2BPaoolYi8VQ4PxGa6eG%2FFkKaQpd1%2Fz7X1SCg1yXJ0mrYxTuFYyqGoRfbM9ax6ND0utZSO5aTY5MDPP8dnrYrvSB93lJNAnbUT95qHE1qGs%2FU%2FpLlGiUL%2F%2Bt2Qa6vMlV537%2BYwRStEQ6%2FI2hkOqoGLl%2B2N%2B44VfiRjATkV4X1aU2k9qq4ljSsLR0ZHdOUMcwSAlfseYPbCfLZAjYrtVjp3cDDz0onPBjqkAVNivCW1DVaY76oRwHo%2FIbF%2B1Py4TbEpItAXCZINMbzUZPN9HGw3UapFwwgKZJFIurvb7By%2FvtYMu9eWqagG6b5qTvlPabQOFNM0zKzBU%2FFKJIqr8rQs3iPrboTUPp3ewfuH5d9XH%2FhgZKqLoYGpQ%2Bnptx7aRR%2FA1mSbCa9e%2Bpy%2FfDLQNp92h6RqatQtVXF6g6WCyTaK900z4a1OK7Y7qK6vAH%2BZ&X-Amz-Signature=21197ad498821b9cd23c0b003007e05236e4fe8826705406494e1a7014b2d568&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8170a486-c3e7-811a-9ea1-00037f488e6b/58466407-8bac-464e-b28c-ecf2b5fb28a9/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625IMBNKH%2F20260417%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260417T181350Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDNwBQ%2BnvLXvxQfr9oPCRqqneBw9hxW6qT3kScwWB%2FqSgIhAKlzs%2BpnyUjAOKS3F%2F4JlE0Np3k4YnlP%2Bz5Yq8XT%2FFBZKogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzgNfemwKNfOeho3l8q3AP95UIIrRYXbXdhsv6VacPLsetg%2Fbpq6JvfANgKCrl732zKNztDOdhSGV7WQgrQQmiei7ttRw%2BrNXKLwmM7qLvTVtj2wtQDIM3PBuPGgEyqbA1aYxcEu0A6yCtvO1t1C1qwSpeblSm%2F0Fvjox3cLV%2FUZ6Km3qTYUGNJlFflYp9MY1zx%2FOfctaFVwcRTk8%2F4qIyuBSjoyqHUp1eseY8JTaDGuqX6ioecQu6Uj8m4J%2FliIndeShHoUqMMX7N9uBkUEqGTwKMepsWqjsQCJkWMmxvn%2BLeREYkk6M55GR50TaJ%2BJ%2FRr9yrjkdDdszIiZAFpnqC68EaoBK%2Bh%2FfOkU0hI0s4iuHwUCCV1RoZtEitpKbejLDtmohE49%2B15kgzjQ8TsVPNNZcD6qas3lyn0Fgjjlaa%2FOoAUEkBdhsCFcgO%2BPaoolYi8VQ4PxGa6eG%2FFkKaQpd1%2Fz7X1SCg1yXJ0mrYxTuFYyqGoRfbM9ax6ND0utZSO5aTY5MDPP8dnrYrvSB93lJNAnbUT95qHE1qGs%2FU%2FpLlGiUL%2F%2Bt2Qa6vMlV537%2BYwRStEQ6%2FI2hkOqoGLl%2B2N%2B44VfiRjATkV4X1aU2k9qq4ljSsLR0ZHdOUMcwSAlfseYPbCfLZAjYrtVjp3cDDz0onPBjqkAVNivCW1DVaY76oRwHo%2FIbF%2B1Py4TbEpItAXCZINMbzUZPN9HGw3UapFwwgKZJFIurvb7By%2FvtYMu9eWqagG6b5qTvlPabQOFNM0zKzBU%2FFKJIqr8rQs3iPrboTUPp3ewfuH5d9XH%2FhgZKqLoYGpQ%2Bnptx7aRR%2FA1mSbCa9e%2Bpy%2FfDLQNp92h6RqatQtVXF6g6WCyTaK900z4a1OK7Y7qK6vAH%2BZ&X-Amz-Signature=b783ff075b84e093b2269f980726f2c10fc175f0872d5bbf0ff0b5f5b2d0ca91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### 第三步：配置 GitHub Actions


### 3.1 添加 GitHub Secrets


在 GitHub 仓库中：

1. 进入 `Settings` → `Secrets and variables` → `Actions`
2. 点击 `New repository secret`
3. 添加两个 secret：
    - `NOTION_TOKEN`: 你的 Notion 集成密钥
    - `NOTION_DATABASE_ID`: 你的数据库 ID

### 3.2 创建 GitHub Actions 工作流


创建 `.github/workflows/sync-notion.yml`：


```plain text
name: Sync Notion to Blog

on:
  # 每天凌晨 2 点自动执行
  schedule:
    - cron: '0 18 * * *'  # UTC 18:00 = 北京时间 02:00

  # 手动触发
  workflow_dispatch:

  # 推送到 main 分支时触发（可选）
  push:
    branches:
      - main
    paths:
      - 'scripts/sync-notion.js'

jobs:
  sync:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout 代码
        uses: actions/checkout@v3

      - name: 设置 Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: 安装依赖
        run: npm install

      - name: 同步 Notion 笔记
        env:
          NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}
          NOTION_DATABASE_ID: ${{ secrets.NOTION_DATABASE_ID }}
        run: node scripts/sync-notion.js

      - name: 提交更改
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add Article/note/*.md
          git diff --quiet && git diff --staged --quiet || (git commit -m "🔄 自动同步 Notion 笔记 $(date +'%Y-%m-%d %H:%M:%S')" && git push)
```



### 第四步：测试同步


### 4.1 本地测试


```plain text
# 安装依赖
npm install @notionhq/client notion-to-md dotenv

# 创建 .env 文件并填入密钥

# 运行同步脚本
node scripts/sync-notion.js
```


### 4.2 检查结果


查看 `Article/note/` 目录，应该能看到从 Notion 同步的 Markdown 文件。


### 4.3 GitHub Actions 测试

1. 提交代码到 GitHub
2. 进入 `Actions` 标签页
3. 点击 `Sync Notion to Blog` 工作流
4. 点击 `Run workflow` 手动触发
5. 查看执行日志


## 🎨 优化建议


### 1. 图片处理


Notion 中的图片需要特殊处理：


```plain text
// 在 sync-notion.js 中添加图片下载功能
async function downloadImage(url, fileName) {
  const response = await fetch(url)
  const buffer = await response.buffer()
  const imagePath = path.join(__dirname, '../Article/public/images', fileName)
  fs.writeFileSync(imagePath, buffer)
  return `/images/${fileName}`
}
```


### 2. 增量同步


只同步更新的文章：


```plain text
// 记录上次同步时间
const lastSyncTime = fs.existsSync('.last-sync')
  ? fs.readFileSync('.last-sync', 'utf-8')
  : new Date(0).toISOString()

// 查询时添加时间过滤
filter: {
  and: [
    {
      property: '是否展示',
      checkbox: { equals: true }
    },
    {
      property: '更新时间',
      last_edited_time: { after: lastSyncTime }
    }
  ]
}

// 同步完成后更新时间
fs.writeFileSync('.last-sync', new Date().toISOString())
```


### 3. 删除处理


处理取消勾选的文章：


```plain text
// 查询所有文章（包括未勾选的）
const allPages = await notion.databases.query({
  database_id: DATABASE_ID
})

// 找出需要删除的文章
const publishedPages = allPages.results.filter(
  p => p.properties['是否展示']?.checkbox === true
)

const publishedTitles = publishedPages.map(
  p => p.properties['标题']?.title[0]?.plain_text
)

// 删除本地不在发布列表中的文件
const localFiles = fs.readdirSync('Article/note')
localFiles.forEach(file => {
  const title = file.replace('.md', '')
  if (!publishedTitles.includes(title)) {
    fs.unlinkSync(path.join('Article/note', file))
    console.log(`🗑️ 删除文章: ${file}`)
  }
})
```


### 4. 添加同步状态通知


使用 GitHub Actions 发送通知：


```plain text
- name: 发送通知（可选）
  if: success()
  run: |
    echo "✅ Notion 同步成功！"
    # 可以集成 Telegram/钉钉/企业微信通知
```



## 📊 使用流程


### 日常使用

1. **在 Notion 中写笔记**
    - 正常在 Notion 中编辑文章
    - 使用 Notion 的所有功能（表格、代码块、图片等）
2. **发布到博客**
    - 勾选"是否展示"复选框
    - 等待自动同步（每天凌晨 2 点）
    - 或手动触发 GitHub Actions
3. **取消发布**
    - 取消勾选"是否展示"
    - 下次同步时自动删除
4. **更新文章**
    - 直接在 Notion 中编辑
    - 自动同步最新内容


## 🔧 故障排查


### 问题 1：同步失败


**检查清单**：

- [ ] Notion Token 是否正确
- [ ] Database ID 是否正确
- [ ] 数据库是否连接到集成
- [ ] GitHub Secrets 是否配置正确

### 问题 2：图片无法显示


**解决方案**：

- Notion 图片链接有时效性，需要下载到本地
- 使用上面的图片下载功能

### 问题 3：格式转换问题


**解决方案**：

- 某些 Notion 特殊块可能转换不完美
- 可以使用 `notion-to-md` 的自定义转换器


## 💡 进阶功能


### 1. 多数据库支持


```plain text
const DATABASES = [
  { id: 'xxx', folder: 'note' },
  { id: 'yyy', folder: 'blog' }
]

for (const db of DATABASES) {
  await syncDatabase(db.id, db.folder)
}
```


### 2. 自动生成目录


```plain text
// 根据分类自动创建子目录
const categoryFolder = path.join('Article/note', category)
if (!fs.existsSync(categoryFolder)) {
  fs.mkdirSync(categoryFolder, { recursive: true })
}
```


### 3. SEO 优化


```plain text
// 在 frontmatter 中添加 SEO 信息
const frontmatter = `---
title: ${title}
description: ${excerpt}
keywords: ${tags.join(', ')}
date: ${createdTime}

`
```



## 📋 完整文件清单


需要创建的文件：


```plain text
qiuqiumao.blog/
├── scripts/
│   └── sync-notion.js          # 同步脚本
├── .github/
│   └── workflows/
│       └── sync-notion.yml     # GitHub Actions 配置
├── .env                        # 环境变量（不提交）
├── .gitignore                  # 添加 .env
└── package.json                # 添加依赖
```



## ✅ 实施检查清单

- [ ] 创建 Notion 数据库并配置属性
- [ ] 获取 Notion 集成密钥
- [ ] 连接数据库到集成
- [ ] 安装 npm 依赖
- [ ] 创建同步脚本
- [ ] 本地测试同步
- [ ] 配置 GitHub Secrets
- [ ] 创建 GitHub Actions 工作流
- [ ] 测试自动同步
- [ ] 优化图片处理
- [ ] 添加增量同步
- [ ] 测试删除功能


## 🎯 预期效果


完成后，你的工作流将是：

1. 📝 在 Notion 中写笔记（舒适的编辑体验）
2. ✅ 勾选"是否展示"（一键发布）
3. ⏰ 等待自动同步（每天凌晨 2 点）
4. 🌐 博客自动更新（无需手动操作）
5. 🔄 修改 Notion 内容自动同步到博客


**需要我帮你实施这个方案吗？我可以：**

1. 创建同步脚本
2. 配置 GitHub Actions
3. 测试整个流程