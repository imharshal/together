import * as React from "react";
import Avatar from "@mui/material/Avatar";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name, sx) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      // width: { xs: 80, sm: 130, md: 200 },
      // height: { xs: 80, sm: 130, md: 200 },
      width: "30%",
      height: "60%",
      fontSize: "30%",
      ...sx,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function NamedAvatar({ name, sx }) {
  return <Avatar {...stringAvatar(name, sx)} />;
}
