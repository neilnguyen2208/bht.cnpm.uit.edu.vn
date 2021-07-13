import React from 'react';
import './Footer.scss';
import logo from 'assets/images/logo.png';

export default class Footer extends React.Component {
    render() {
        return (
            <footer class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 col-lg-4">
                            <div class="widget1" style={{ background: "rgba(255,255,255, 1)", padding: "10px" }}>
                                <div class="logo">
                                    <img src={logo} class="img-fluid" alt="" />
                                </div>
                                <p style={{ color: "var(--black)" }}>
                                    Kênh thông tin Sinh viên của BHT khoa CNPM - Trường ĐH CNTT - ĐHQG-HCM. Website do Ban học tập CNPM thực hiện và quản lý.
                                </p>
                                <div class="socialLinks">
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <i class="fab fa-facebook-f"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="fab fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="fab fa-linkedin-in"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="fab fa-google-plus-g"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4">
                            <div class="widget2">
                                <h5>
                                    Hoạt động mới
                                </h5>
                                <div class="media">
                                    <img class="img-fluid" src="https://i.ibb.co/CKNmhMX/blog1.jpg" alt="" />
                                    <div class="media-body d-flex align-self-center">
                                        <div class="content">
                                            <a href="#">
                                                <p>
                                                    Hoạt động training ngày 21/3/2021
                                                </p>
                                            </a>
                                            <span>
                                                20/02/2021
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="media">
                                    <img class="img-fluid" src="https://i.ibb.co/m5yGbdR/blog2.jpg" alt="" />
                                    <div class="media-body d-flex align-self-center">
                                        <div class="content">
                                            <a href="#">
                                                <p>
                                                    Tổng kết hoạt động cuối năm
                                                </p>
                                            </a>
                                            <span>
                                                20/12/2020
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-2">
                            <div class="widget3">
                                <h5>
                                    Liên hệ
                                </h5>
                                <ul>
                                    <li>
                                        <a href="#">
                                            Email: bht.cnpm.uit@gmail.com
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Hotline: 0366272703
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-2">
                            <div class="widget4">
                                <h5>
                                    Chính sách
                                </h5>
                                <ul>
                                    <li>
                                        <a href="#">
                                        </a>
                                    </li>


                                </ul>
                                <h5>
                                    Chịu trách nhiệm
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
                        <div class="row">
                            <div class="col-12 text-center">
                                <p>&copy; Copyright All rights reserved 2021.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer >
        );
    }
}