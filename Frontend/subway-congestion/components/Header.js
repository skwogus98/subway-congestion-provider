import Link from "next/link";
import React from "react";

function Header() {
    return (
        <div className="p-4 w-full flex justify-between border-b-2 mb-10">
            <div></div>
            <div><Link href={"/"}>지하철 혼잡도 제공 시스템</Link></div>
            <div>유저 정보</div>
        </div>
    );
}

export default Header;
