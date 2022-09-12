type Props = {
  imageSources?: (string | undefined)[];
};

const IntroduceCarType = ({ imageSources }: Props) => {
  return (
    <div className="space-y-6 lg:col-span-7">
      {/* Description list*/}
      <section
        aria-labelledby="applicant-information-title"
        className="flex flex-col space-y-6 text-gray-700"
      >
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2
              id="applicant-information-title"
              className="text-xl leading-6 font-medium text-gray-900"
            >
              Dịch vụ thuê xe 4 chỗ
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Giá rẻ, uy tín, đảm bảo
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6 space-y-2 flex flex-col">
            <h1>
              Dịch vụ thuê xe du lịch 4-5 chỗ của công ty chúng tôi là dịch vụ
              chuyên nghiệp dành cho những khách hàng đang có nhu cầu thuê xe
              cho mục đích cá nhân. Nếu bạn có nhu cầu về thuê xe 4 – 5 chỗ mà
              chưa tìm được địa chỉ thuê xe uy tín thì gợi ý dành cho bạn là hãy
              đến ngay với công ty chúng tôi. Chúng tôi đảm bảo mang đến cho bạn
              sự hài lòng khi chọn dịch vụ tại công ty.
            </h1>
            {imageSources && (
              <img
                className="bg-cover bg-center w-full h-auto"
                src={imageSources[0]}
              ></img>
            )}
          </div>
        </div>
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2
              id="applicant-information-title"
              className="text-xl leading-6 font-medium text-gray-900"
            >
              Ưu điểm khi thuê xe của chúng tôi
            </h2>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6 flex flex-col space-y-2">
            <div className="font-semibold text-gray-700">
              Cung cấp đa dạng các loại xe 4-5 chỗ
            </div>
            <div className="flex flex-col space-x-3">
              <h1>
                Để đáp ứng một nhu cầu ngày càng tăng cao từ phía khách hàng đối
                với dịch vụ thuê xe du lịch thì công ty luôn sẵn sàng cung cấp
                đa dạng các dòng xe 4 chỗ để cho khách hàng lựa chọn. Hiện tại
                công ty chúng tôi phục vụ khách hàng đảm bảo đều là các dòng xe
                đời mới, với mẫu mã, kiểu dáng, màu sắc đều được nhiều người yêu
                thích, kèm theo đó là chất lượng đến trang bị tiện nghi vô cùng
                đảm bảo. Sẵn sàng đáp ứng các yêu cầu khác nhau, tăng thêm sự
                lựa chọn cho khách hàng. Một số dòng xe 4 - 5 chỗ cho bạn tham
                khảo như sau:
              </h1>
              <div>
                <li className="font-semibold">
                  Xe Toyota-Altis phong cách, kiểu dáng hiện đại.
                </li>
                <li className="font-semibold">
                  Xe Toyota-Vios nhỏ gọn, thể thao.
                </li>
                <li className="font-semibold">
                  Xe Toyota - Camry sang trọng đẳng cấp: 2.4G, 3.5Q, và còn rất
                  nhiều dòng xe khác để phục vụ theo nhu cầu.
                </li>
              </div>
            </div>
            <h1>
              Nếu bạn chọn là khách hàng sử dụng dịch vụ này của công ty thì với
              uy tín nhiều năm trong nghề chúng tôi chắc chắn mang đến sự hài
              lòng khi thuê xe.
            </h1>
            {imageSources && (
              <img
                className="bg-cover bg-center w-full h-auto"
                src={imageSources[1]}
              ></img>
            )}
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6 flex flex-col space-y-2">
            <div className="font-semibold text-gray-700">
              Chất lượng xe khi thuê được đảm bảo
            </div>
            <div>
              <h1>
                Tất cả những chiếc xe của chúng tôi đều đã được kiểm tra chất
                lượng định kỳ sau mỗi lần sử dụng, cho thuê, do đó bạn hoàn toàn
                có thể an tâm. Những chiếc xe được mang đến phục vụ cho khách
                hàng là những chiếc xe sử dụng từ 5 năm trở xuống, các chi tiết
                trang bị đều đầy đủ từ ngoại thất bên ngoài cho tới nội thất bên
                trong, đặc biệt các tính năng an toàn luôn linh hoạt. Đem đến sự
                an tâm cho các hành khách trên xe khi di du lịch, mang đến cho
                bạn chuyến đi du lịch thoải mái nhất.
              </h1>
              {imageSources && (
                <img
                  className="bg-cover bg-center w-full h-auto"
                  src={imageSources[3]}
                ></img>
              )}
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6 flex flex-col space-y-2">
            <div className="font-semibold text-gray-700">
              Thuê xe dễ dàng, thủ tục nhanh gọn
            </div>
            <div className="flex flex-col space-y-3">
              <h1>
                Bạn sẽ không cần mất nhiều thời gian để thuê xe từ công ty,
                chúng tôi giảm thiểu tối đa thời gian và tiết kiệm thời gian cho
                khách hàng khi làm thủ tục. Ngoài ra nhân viên tư vấn sẽ giúp
                bạn giải đáp mọi thắc mắc trước khi thuê để tránh trường hợp xảy
                ra sai sót. Hiện tại công ty cung cấp hai hình thức thuê xe dành
                cho khách hàng đó là thuê xe tự lái và thuê xe có lái.
              </h1>
              <h1>
                Với xe có lái: Bạn chỉ cần nhấc máy hoặc đến với công ty để đăng
                ký thuê xe, chúng tôi chắc chắn giao xe đúng giờ không làm chậm
                trễ thời gian của bạn, hơn nữa với xe có lái thì lái xe là người
                có kinh nghiệm và tay lái cứng, xe được cho thuê luôn đảm bảo
                chất lượng an toàn và sạch sẽ nhất.
              </h1>
              <div>
                <h1>
                  Với xe tự lái: dịch vụ thuê xe du lịch 4-5 chỗ cho những khách
                  hàng tự lái thì sẽ được công ty giao xe tận nhà và đáp ứng
                  được các điều kiện sau:
                </h1>
                <div>
                  <li className="font-semibold">Có hộ khẩu tại Hà Nội</li>
                  <li className="font-semibold">
                    Đã có bằng lái xe ô tô, bằng lái xe máy
                  </li>
                  <li className="font-semibold">
                    Chứng minh thư nhân dân, căn cước công dân
                  </li>
                </div>
              </div>
              <h1>
                Mọi thủ tục đều được công ty tinh giản để không làm mất nhiều
                thời gian của khách hàng nhưng vẫn đảm bảo được sự tin cậy đối
                với cả hai bên.
              </h1>
              {imageSources && (
                <img
                  className="bg-cover bg-center w-full h-auto"
                  src={imageSources[2]}
                ></img>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntroduceCarType;
