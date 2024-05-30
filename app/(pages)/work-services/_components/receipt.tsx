//@ts-check
import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { Order } from "@prisma/client";
import { format } from "date-fns";
import { ArabicNumberToText } from "@/lib/thaibath";

Font.register({ family: "NotoSerifThai", src: "/fonts/NotoSerifThai.ttf" });

// Create styles

interface ReceiptProps {
  schoolData?: {
    name: string;
    addres: string;
    phone: string;
    image: Image;
  };
  orderData?: any;
}

// Create Document Component
export function Receipt({ schoolData, orderData }: ReceiptProps) {
  const [printDate, setPrintDate] = useState("");

  useEffect(() => {
    const date = new Date();

    const print_date = `${date.getDate()} ${convertMonth(date.getMonth())} ${
      date.getFullYear() + 543
    } ${format(date, "HH:mm:ss")}`;
    setPrintDate(print_date);
  }, []);


  const getOrderDate = (d: Date) => {
    const date = new Date(d);

    if (!date) return "";

    return `${date.getDate()} ${convertMonth(date.getMonth())} ${
      date.getFullYear() + 543
    }`;
  };

  const getCustomerName = () => {
    return `${orderData?.student?.title ?? ""}${
      orderData?.student?.f_name ?? ""
    } ${orderData?.student?.l_name ?? ""} ${
      orderData?.student?.classroom?.name ?? ""
    } ${orderData?.student?.nickname ?? ""}`;
  };

  const getTotal = () => {
    return orderData?.OrderDetail?.reduce(
      (accumulator: number, object: any) => {
        return accumulator + (object?.amount ?? 0) * (object?.price ?? 0);
      },
      0
    );
  };

  const convertMonth = (m: number) => {
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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {orderData && (
          <>
            <View style={styles.session_row}>
              <View>
                <Text style={styles.text_school}>โรงเรียนประจันตวิทยา </Text>
                <Text>
                  116 ตำบลวังสะพุง อำเภอวังสะพุง จังหวัดเลย 42130{"  "}
                </Text>
                <Text>โทรศัพท์ 0878600634</Text>
              </View>
              <View>
                <Image
                  style={styles.image_logo}
                  src="/images/schools/logo01.png"
                />
              </View>
              <View>
                <Text style={styles.text_print_date}>
                  วันที่พิมพ์ {printDate}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.text_header}>ใบเสร็จรับเงิน (RECEIPT)</Text>
            </View>
            <View style={styles.session_row}>
              <Text style={styles.text_no}>
                เลขที่ใบเสร็จ (No.) : {orderData?.order_no}
              </Text>
              <Text style={styles.text_date}>
                วันที่ทำรายการ (Date.) : {getOrderDate(orderData?.createdAt!)}
              </Text>
            </View>
            <View>
              <Text style={styles.text_name}>
                ชื่อ - สกุล (Name.) : {getCustomerName()}{" "}
              </Text>
            </View>
            <View style={styles.table}>
              <View style={styles.session_row}>
                <View style={styles.table_th_no}>
                  <Text>ลำดับ </Text>
                  <Text>NO.</Text>
                </View>
                <View style={styles.table_th_description}>
                  <Text>ชื่อรายการ</Text>
                  <Text>Desctiption</Text>
                </View>
                <View style={styles.table_th_number}>
                  <Text>จำนวน </Text>
                  <Text>Number</Text>
                </View>
                <View style={styles.table_th_price}>
                  <Text>ราคา/หน่วย</Text>
                  <Text>Price/Unit</Text>
                </View>
                <View style={styles.table_th_total}>
                  <Text>รวมเงิน</Text>
                  <Text>SumAmount</Text>
                </View>
              </View>

              {orderData?.OrderDetail &&
                orderData.OrderDetail.map((item: any, index: number) => (
                  <View key={index + 1} style={styles.session_row}>
                    <View style={styles.table_td_no}>
                      <Text>{index + 1}</Text>
                    </View>
                    <View style={styles.table_td_description}>
                      <Text>{item.product.name}</Text>
                    </View>
                    <View style={styles.table_td_number}>
                      <Text>{item.amount}</Text>
                    </View>
                    <View style={styles.table_td_price}>
                      <Text>{item.price}</Text>
                    </View>
                    <View style={styles.table_td_total}>
                      <Text>{item.amount * item.price}</Text>
                    </View>
                  </View>
                ))}
            </View>
            <View style={styles.table_footer}>
              <View style={{ width: "80%", alignItems: "center" }}>
                <Text>{ArabicNumberToText(getTotal())} </Text>
              </View>

              <View
                style={{
                  width: "20%",
                  alignItems: "flex-end",
                  paddingRight: 6,
                  borderLeft: 1,
                }}
              >
                <Text>{getTotal()}</Text>
              </View>
            </View>
            <View>
              <View style={styles.session_row}>
                <Text style={{ fontSize: 12 }}>status : </Text>
                <Text style={{ fontSize: 12 }}>
                  {orderData.is_paid ? "ปกติ" : "ค้างชำระ"} {orderData.remark}
                </Text>
              </View>
              <View style={{ ...styles.session_row, marginTop: 12 }}>
                <Text style={{ fontSize: 12 }}>หมายเหตุ : </Text>
                <Text style={{ fontSize: 12 }}>
                  กรุณาเก็บใบเสร็จนี้ไว้เป็นหลักฐานในการชำระเงิน{" "}
                </Text>
              </View>
              <View style={styles.session_sign}>
                <Text style={{ fontSize: 12 }}>
                  ลงชื่อ.......................................................ผู้รับเงิน
                </Text>
                <Text style={{ fontSize: 12, marginTop: 4 }}>ผู้รับเงิน</Text>
              </View>
            </View>
          </>
        )}
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSerifThai",
    marginTop: 50,
    marginLeft: 40,
    marginRight: 14,
    marginBottom: 14,
    fontSize: 10,
  },
  session_row: {
    flexDirection: "row",
  },
  text_school: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text_print_date: {
    marginLeft: 10,
    fontSize: 12,
  },
  image_logo: {
    marginLeft: 20,
    width: 85,
    height: 85,
    objectFit: "contain",
  },
  text_header: {
    margin: "auto",
    marginTop: 10,
    fontSize: 22,
  },
  text_no: {
    fontSize: 16,
  },
  text_date: {
    position: "absolute",
    fontSize: 16,
    marginLeft: "40%",
    width: "100%",
  },
  text_name: {
    fontSize: 16,
    width: "100%",
  },
  table: {
    border: 1,
    width: "90%",
    height: "55%",
    fontSize: 15,
  },
  table_th_no: {
    borderBottom: 1,
    borderRight: 1,
    padding: 2,
    width: "9%",
    alignItems: "center",
  },
  table_th_description: {
    borderBottom: 1,
    borderRight: 1,
    padding: 2,
    width: "37%",
    alignItems: "center",
  },
  table_th_number: {
    borderBottom: 1,
    borderRight: 1,
    padding: 2,
    width: "14%",
    alignItems: "center",
  },
  table_th_price: {
    borderBottom: 1,
    borderRight: 1,
    padding: 2,
    width: "20%",
    alignItems: "center",
  },
  table_th_total: {
    borderBottom: 1,
    padding: 2,
    width: "20%",
    alignItems: "center",
  },
  table_td_no: {
    borderBottom: 1,
    borderRight: 1,
    padding: 2,
    width: "9%",
    alignItems: "center",
  },
  table_td_description: {
    borderBottom: 1,
    borderRight: 1,
    padding: 2,
    paddingLeft: 8,
    width: "37%",
  },
  table_td_number: {
    borderBottom: 1,
    borderRight: 1,
    padding: 2,
    width: "14%",
    alignItems: "center",
  },
  table_td_price: {
    borderBottom: 1,
    borderRight: 1,
    padding: 2,
    paddingRight: 8,
    width: "20%",
    alignItems: "flex-end",
  },
  table_td_total: {
    borderBottom: 1,
    padding: 2,
    paddingRight: 8,
    width: "20%",
    alignItems: "flex-end",
  },
  table_footer: {
    borderBottom: 1,
    borderLeft: 1,
    borderRight: 1,
    padding: 2,
    width: "90%",
    flexDirection: "row",
    fontSize: 15,
  },
  session_sign: {
    marginTop: 10,
    position: "absolute",
    left: "50%",
    top: 50,
    alignItems: "center",
  },
});
