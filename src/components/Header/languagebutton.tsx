import {useTranslation} from 'react-i18next';

const LanguageButton = () => {
    const[t,i18n]=useTranslation();
    return (
<div className="">
	<div className="flex flex-row items-center right-1 ">
		<button onClick={()=>{i18n.changeLanguage('en')}} className="p-2 flex flex-row items-center border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none"
                    >
                        <span className="text-md">En</span>
                        <span className="ml-1"> <img src="https://img.icons8.com/?size=512&id=t3NE3BsOAQwq&format=png" className="w-5 h-5" /></span>
                    </button>

		<button onClick={()=>{i18n.changeLanguage('fr')}} className="p-2 flex flex-row items-center border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none "
                    >
                        <span className="text-md">Fr</span>
                         <span className="ml-1"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/2560px-Flag_of_France.svg.png" className="w-5 h-5 rounded-full" alt="Drapeau de la France" /></span>
                    </button>
	</div>

</div>

);
};

export default LanguageButton ;
