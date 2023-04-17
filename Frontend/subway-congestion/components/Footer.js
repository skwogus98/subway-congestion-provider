import React from "react";
import Link from "next/link";

function Footer() {
    return (
        <div className="bg-gray-300 shadow-md ">
            <div className="max-w-5xl mx-auto text-center sm:justify-center p-8 space-y-2">
                <div className="flex justify-center space-x-6 font-semibold">
                    <Link href="#">회사소개</Link>
                    <Link href="#">제휴문의</Link>
                    <Link href="#">고객센터</Link>
                    <Link href="#">개인정보취급방침</Link>
                    <Link href="#">이용약관</Link>
                </div>
                <div className="text-sm text-gray-600">Copyright ⓒ JaeHyun Inc. All Rights Reserved</div>
            </div>
        </div>
    );
}

export default Footer;
