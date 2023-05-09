import { FiPlusCircle , FiMinusCircle } from "react-icons/fi";
import { FaAmazonPay } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { FaRegWindowClose } from "react-icons/fa"
import { MdLogout } from "react-icons/md"
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineDateRange } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { TbPigMoney } from "react-icons/tb";
import { HiOutlineWallet } from "react-icons/hi2"
import { TiDelete } from "react-icons/ti"


//nav icons
export const home = <RxDashboard /> ;
export const transactions = <FaAmazonPay />;
export const income = <FiPlusCircle /> ;
export const expenses = <FiMinusCircle /> ;

//modal icons
export const close = <FaRegWindowClose /> ;
export const logoutIcon = <MdLogout />;
export const money = <RiMoneyDollarCircleLine />;
export const calender = <MdOutlineDateRange />;
export const detail = <BiMessageDetail />;
export const profit = <TbPigMoney />
export const wallet = <HiOutlineWallet />
export const deleteBtn = <TiDelete />