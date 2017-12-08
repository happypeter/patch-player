# 思路

- 首先把老版本代码显示到页面上
- 从 git 中取出一个 patch
- 根据 patch 信息找到操作点坐标
  - https://github.com/marcelklehr/diff_match_patch
- 把 patch 以行为单位传递给当前组件
- 显示的时候用 https://github.com/jstejada/react-typist/ 这样的动态效果
 - cool

- 用带代码高亮的 div https://github.com/jstejada/react-typist/blob/master/src/Backspace.jsx
