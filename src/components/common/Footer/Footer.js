import React from 'react';
import './Footer.scss';

export default class Footer extends React.Component {
    render() {
        return (
            <footer class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 col-lg-4">
                            <div class="widget1">
                                <div class="logo">
                                    <img src="https://i.ibb.co/vLDyPtM/ak-logo-yellow.png" class="img-fluid" alt="" />
                                </div>
                                <p>
                                    In eu libero ligula. Fusce eget metus lorem, ac viverra
                                    leo. Nullam convallis, arcu vel pellentesque sodales,
                                    nisi est varius diam, ac ultrices sem ante quis sem.
                                    Proin ultricies volutpat sapien.
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
                                                    Did son unreserved themselves indulgence its
                                                </p>
                                            </a>
                                            <span>
                                                Aug 17, 2019
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
                                                    Rapturous am eagerness it as resolving household
                                                </p>
                                            </a>
                                            <span>
                                                Aug 17, 2019
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-2">
                            <div class="widget3">
                                <h5>
                                    Quick Links
                                </h5>
                                <ul>
                                    <li>
                                        <a href="#">
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            about
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            contact
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            privecy
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            skills
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            career
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-2">
                            <div class="widget4">
                                <h5>
                                    Other Links
                                </h5>
                                <ul>
                                    <li>
                                        <a href="#">
                                            themeforest
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            graphicriver
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            codecanyon
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            videohive
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            redpen
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            codepen
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
                                <p>&copy; Copyright All rights reserved 2019.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}