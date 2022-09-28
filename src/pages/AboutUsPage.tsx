import { aboutus } from "../images";

export default function AboutUsPage() {
  return (
    <div className="bg-white h-full">
      <section aria-labelledby="features-heading" className="relative h-full">
        <div className="aspect-w-3 aspect-h-2 overflow-hidden sm:aspect-w-5 lg:aspect-none lg:absolute lg:w-1/2 lg:h-full lg:pr-4 xl:pr-16">
          <img
            src={aboutus}
            alt="Black leather journal with silver steel disc binding resting on wooden shelf with machined steel pen."
            className="h-full w-full object-center object-cover lg:h-full lg:w-full"
          />
        </div>

        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:pb-32 sm:px-6 lg:max-w-7xl lg:pt-32 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className="lg:col-start-2">
            <p className="text-4xl font-extrabold tracking-tight my-5 text-indigo-700">
              Về chúng tôi
            </p>
            <div className="flex flex-col space-y-4 text-gray-500">
              <p>
                Trên thị trường cho thuê xe trên địa bàn Hà Nội bây giờ đã khá
                là phổ biên và thông dụng. Nhưng không phải công ty nào cũng đáp
                ứng nhu cầu ngày càng cao của quý khách hàng với gía cả vô cùng
                phải chăng. CarIT xin đảm bảo cung cấp đầy đủ, đáp ứng nhu cầu
                của quý khách khi quý khách thuê xe.
              </p>
              <p>
                Với đội ngũ tài xế lái xe chuyên nghiệp, giàu kinh nghiệm cùng
                nhân viên tận tình thân thiện và chu đáo quý khách hàng không
                phải lo lắng sự an toàn về chặng đường mình sắp đi. Các dòng xe
                cao cấp và liên tục được nâng cấp phục vụ khách hàng tốt nhất.
              </p>
              <p>
                Hãy gọi ngay cho chúng tôi qua Hotline : 0999999999, để nhận
                được sự tư vấn về đội xe cũng như đặt hàng thuê xe. Những nhân
                viên chăm sóc khách hàng của chúng tôi sẽ nhiệt tình tư vấn và
                giúp quý khách lựa chọn được chiếc xe phù hợp nhất cho chuyến đi
                của quý khách hàng.
              </p>
            </div>
            <div className="mt-6">
              <h1 className="font-bold text-xl mb-3  text-indigo-700">
                Các dịch vụ mà chúng tôi đang cung cấp
              </h1>
              <div className="text-gray-500 flex flex-col space-y-1">
                <li>Cho thuê xe theo thời gian từ 4 chỗ đến 16 chỗ</li>
                <li>
                  Cung cấp các dịch vụ kèm theo xe: trang trí xe hoa, thuê lái
                  xe theo ngày,...
                </li>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
