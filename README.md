# 八音盒

[![pnpm v9](https://img.shields.io/badge/maintained%20with-pnpm%209.0-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)
[![nodejs v20](https://img.shields.io/badge/Node.js-v20.17.0-026e00.svg?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)

## 运行

```bash
pnpm i
pnpm vite
```

## 配置

```bash
# vim .env

# 配置曲库仓库API
VITE_ABC_GITHUB_REPOSITORY_BASE_URL = https://ungh.cc/repos/holy-two/musicbox-papertape/files/main/

# 配置曲库目录为：tapes/*.abc
VITE_ABC_DIRECTORY_PATH = tapes/

# 配置展示的第一首曲目为：《G弦上的咏叹调》
VITE_INDEX_ABC_NAME = Air auf der G-Saite
```

## 借物

GitHub API：[unjs/ungh](https://github.com/unjs/ungh)
