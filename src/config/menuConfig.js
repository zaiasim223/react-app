/**
 * icon:菜单项图标
 * roles:标明当前菜单项在何种角色下可以显示，如果不写此选项，表示该菜单项完全公开，在任何角色下都显示
 */
const menuList = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: "home",
    roles: ["admin"]
  },
  {
    title: "Users",
    path: "/user",
    icon: "usergroup-add",
    roles: ["admin"]
  },
  {
    title: "Books",
    path: "/book",
    icon: "read",
    roles: ["admin"]
  },
  {
    title: "Songs",
    path: "/song",
    icon: "play-circle",
    roles: ["admin"]
  },
  {
    title: "Movies",
    path: "/movie",
    icon: "play-square",
    roles: ["admin"]
  },
  {
    title: "News",
    path: "/news",
    icon: "global",
    roles: ["admin"]
  },
  {
    title: "Quotes",
    path: "/quote",
    icon: "file-text",
    roles: ["admin"]
  },
  {
    title: "Rewards",
    path: "/reward",
    icon: "file-text",
    roles: ["admin"]
  },
];
export default menuList;
