export const convertMonth = (m: number) => {
  let _month = "";
  switch (m) {
    case 0:
      _month = "มกราคม";
      break;
    case 1:
      _month = "กุมภาพันธ์";
      break;
    case 2:
      _month = "มีนาคม";
      break;
    case 3:
      _month = "เมษายน";
      break;
    case 4:
      _month = "พฤษภาคม";
      break;
    case 5:
      _month = "มิถุนายน";
      break;
    case 6:
      _month = "กรกฎาคม";
      break;
    case 7:
      _month = "สิงหาคม";
      break;
    case 8:
      _month = "กันยายน";
      break;
    case 9:
      _month = "ตุลาคม";
      break;
    case 10:
      _month = "พฤศจิกายน";
      break;
    case 11:
      _month = "ธันวาคม";
      break;
  }
  return _month;
};
