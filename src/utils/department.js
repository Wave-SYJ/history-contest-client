import constants from "@/constants";

export function getDepartmentById(id) {
  for (const value of constants.DEPARTMENT) {
    if (value.id == id) return value.name;
  }
  return "无法识别";
}

export function getDepartmentByPrefix(prefix) {
  for (const value of constants.DEPARTMENT) {
    if (value.prefix == prefix) return value.name;
  }
  return "无法识别";
}

export function getDepartmentBySid(Sid) {
  return getDepartmentByPrefix(Sid.substring(0, 2));
}
