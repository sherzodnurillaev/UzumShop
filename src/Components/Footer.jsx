const Footer = () => {
  return (
    <>
      <div className="mt-[50px] mb-[70px] w-full max-w-[1200px] mx-auto">
        <div className="flex flex-wrap justify-between items-start gap-[50px] md:gap-[100px]">
          
          {/* Секция с приложениями */}
          <div>
            <h1 className="text-[18px] mb-[10px]">Скачать приложение</h1>
            <div className="flex gap-[20px]">
              <a
                href="https://apps.apple.com/uz/app/uzum-market-internet-do-kon/id1640483056"
                className="cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex gap-[8px] items-center">
                  <img src="/footer/apple.png" alt="AppStore" className="w-[20px]" />
                  <p className="text-[#282828] text-[16px]">AppStore</p>
                </div>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=uz.uzum.app&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <div className="flex gap-[8px] items-center">
                  <img
                    src="/footer/google-play.png"
                    alt="Google Play"
                    className="w-[20px]"
                  />
                  <p className="text-[#282828] text-[16px]">Google Play</p>
                </div>
              </a>
            </div>
          </div>

          {/* Секция с соцсетями */}
          <div>
            <h1 className="text-[18px] mb-[10px]">Uzum в соцсетях</h1>

            <div className="flex gap-[20px]">
              <a
                href="https://www.instagram.com/uzum.market?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                className="cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/footer/instagram.png" alt="Instagram" className="w-[40px]" />
              </a>

              <a
                href="https://t.me/uzum_market"
                className="cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/footer/telegram.png" alt="Telegram" className="w-[40px]" />
              </a>

              <a
                href="https://www.facebook.com/uzummarket/"
                className="cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/footer/facebook.png" alt="Facebook" className="w-[40px]" />
              </a>

              <a
                href="https://m.youtube.com/channel/UCnVB5TrmjYgaaDvxjrifxnA"
                className="cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/footer/youtube.png" alt="YouTube" className="w-[40px]" />
              </a>
            </div>
          </div>
        </div>

        {/* Раздел с ссылками и авторскими правами */}
        <hr className="mt-[50px] mb-[10px]" />

        <div className="flex flex-wrap justify-between items-center">
          <div className="flex gap-[20px]">
            <a
              href="https://legal.uzum.uz/privacy-policy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-medium cursor-pointer"
            >
              Соглашение о конфиденциальности
            </a>

            <a
              href="https://legal.uzum.uz/user-agreement-ru.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-medium cursor-pointer"
            >
              Пользовательское соглашение
            </a>
          </div>

          <span className="text-[12px] text-gray-400">
            «2024© ООО «UZUM MARKET». ИНН 309376127. Все права защищены»
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
