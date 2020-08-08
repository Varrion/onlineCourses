import React from "react";

export default function SocialMediaIcons() {
    return(
        <>
            <ul className="list-inline">
                <li className="list-inline-item">
                    <a className="social-icon text-xs-center" target="_blank"
                       href="https://www.facebook.com">
                        <i className="fab fa-facebook"/>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="social-icon text-xs-center" target="_blank"
                       href="https://www.twitter.com">
                        <i className="fab fa-twitter"/>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="social-icon text-xs-center" target="_blank"
                       href="https://www.skype.com">
                        <i className="fab fa-skype"/>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="social-icon text-xs-center" target="_blank"
                       href="https://www.google.com/">
                        <i className="fab fa-google"/>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="social-icon text-xs-center" target="_blank"
                       href="https://www.instagram.com/">
                        <i className="fab fa-instagram"/>
                    </a>
                </li>
            </ul>
        </>
    )
}