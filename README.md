# 八音盒


## 运行

```bash
# nodejs 16+
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

GitHub API：`[unjs/ungh](https://github.com/unjs/ungh)`
