* 下面命令可以列出在 c7eabfc 版本下的所有文件

```
``
git ls-tree -r c7eabfc --name-only
```

* 列出某个版本下所有更改过的文件

```
git diff-tree --no-commit-id --name-only -r <commit-ish>
```

* 获取某个版本中某个文件的内容

```
git show <commit-ish>:path/to/file
```

* 获取某个版本中某个文件的 patch

```
git show --pretty=format:%b <commit-ish> path/to/file
```

