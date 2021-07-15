import React from 'react';
import './Footer.scss';
import logo from 'assets/images/logo.png';
import white_bg from 'assets/images/white_bg.jpg'

export default class Footer extends React.Component {
    render() {
        return (
            <footer class="footer" id="footer">
                <div class="container">
                    <div class="row" >
                        <div class="col-md-12 col-lg-2">
                            <div class="logo">
                                <img src={logo} class="img-fluid" alt="" style={{ width: "120px", height: "auto" }} />
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-6 web-intro">
                            Kênh thông tin Sinh viên của <b>BHT khoa CNPM - Trường ĐH CNTT - ĐHQG-HCM</b>. Website do Ban học tập CNPM thực hiện và quản lý.
                        </div>
                        <div class="col-md-12 col-lg-2" style={{ background: "" }}>
                            <ul class="footer-social">
                                <li><a href="/" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href="/" target="_blank"><i class="fa fa-envelope"></i></a></li>
                            </ul>
                        </div>
                    </div >
                    <div class="row" style={{ paddingBottom: "20px" }}>

                        <div class="col-md-6 col-lg-4">
                            <div class="widget2">
                                <div class="widget3">
                                    <h5>
                                        Liên hệ:
                                    </h5>
                                    <ul>
                                        <li>
                                            <li><a href="/"><i class="fas fa-envelope fa-flip-horizontal" style={{ marginRight: "5px", marginBottom: "5px" }}></i>Email: bht.cnpm.uit@gmail.com</a></li>
                                        </li>
                                        <li>
                                            <li><a href="/"><i class="fas fa-phone fa-flip-horizontal" style={{ marginRight: "5px" }}></i>Hotline: (010) 1234 4321</a></li>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-2">
                            <div class="widget4">
                                <h5>
                                    Chính sách:
                                </h5>
                                <ul>
                                    <li>
                                        <a href="/">
                                            Điều khoản dịch vụ
                                        </a>
                                    </li>
                                </ul>

                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-2">
                            <div class="widget5">
                                <h5>
                                    Chịu trách nhiệm:
                                </h5>
                                <ul>
                                    <li>
                                        <a href="#">
                                            Lưu Biêu Nghị
                                        </a>
                                        <a href="#">
                                            Nguyễn Văn Đông
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="copyRightArea">
                    <div class="container">
                        <div class="row" style={{ background: "none", boxShadow: "none", borderLeft: "none" }} >
                            <div class="col-12 text-center" >
                                <p style={{ color: "#363636", borderBottom: "2px solid white", paddingBottom: "5px", width: "fit-content" }}>&copy; Copyright All rights reserved 2021.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer >
        );
    }
}