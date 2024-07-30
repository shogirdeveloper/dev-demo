import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from "../../hooks/useTelegram";
import { data } from './data';
const bg = require("../../image/bg.jpeg")

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('');
    const [phone, setPhone] = useState("");
    const [num, setNum] = useState('');
    const { tg } = useTelegram();


    const onSendData = useCallback(() => {
        const data = {
            country,
            phone,
            street,
            subject,
            num
        }
        tg.sendData(JSON.stringify(data));
    }, [country, street, subject, phone, num])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: "Ma'lumotlarni jo'nating"
        })
    }, [])

    useEffect(() => {
        if (!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }
    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }
    const onChangeNum = (e) => {
        setNum(e.target.value)
    }


    return (
        <div className={"form"}>
            <img src={bg} alt="" style={{ width: "100%", borderRadius: "7px", height: "100%", marginBottom: "20px" }} />
            <h3 style={{ textAlign: "center" }}>Ma'lumotarni to'ldiring</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Ismingiz'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={"Do'kon nomi"}
                value={street}
                onChange={onChangeStreet}
            />
            <input
                className={'input'}
                type="text"
                placeholder={"Telefon raqam"}
                value={phone}
                onChange={onChangePhone}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                {data?.map((res) => {
                    return (
                        <>
                            <option key={res?.id} value={res?.name}>{res?.name} </option>
                        </>
                    )
                })}
            </select>
            <input
                className={'input'}
                type="number"
                placeholder={"Necha dona"}
                value={num}
                onChange={onChangeNum}
            />
        </div>
    );
};

export default Form;