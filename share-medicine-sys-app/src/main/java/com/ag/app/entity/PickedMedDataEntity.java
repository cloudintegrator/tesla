package com.ag.app.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "picked_med_data")
public class PickedMedDataEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String email;
    private String medicine_name;
    private Integer medicine_qty;
    private Date medicine_validity;
    private Boolean expired;
    private String msg;
    private String send_to;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMedicine_name() {
        return medicine_name;
    }

    public void setMedicine_name(String medicine_name) {
        this.medicine_name = medicine_name;
    }

    public Integer getMedicine_qty() {
        return medicine_qty;
    }

    public void setMedicine_qty(Integer medicine_qty) {
        this.medicine_qty = medicine_qty;
    }

    public Date getMedicine_validity() {
        return medicine_validity;
    }

    public void setMedicine_validity(Date medicine_validity) {
        this.medicine_validity = medicine_validity;
    }

    public Boolean getExpired() {
        return expired;
    }

    public void setExpired(Boolean expired) {
        this.expired = expired;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getSend_to() {
        return send_to;
    }

    public void setSend_to(String send_to) {
        this.send_to = send_to;
    }
}
