var mySwiper = new Swiper ('.swiper-container', {
    loop: false, // 最後のスライドまで到達した場合、最初に戻らずに続けてスライド可能にするか。
    speed: 600, // スライドが切り替わるトランジション時間(ミリ秒)。
    slidesPerView: 1, // 何枚のスライドを表示するか
    spaceBetween: 30, // スライド間の余白サイズ(ピクセル)
    direction: 'horizontal', // スライド方向
    effect: "flip",
    initialSlide:1,

    // ページネーションを表示する場合
    pagination: {
      el: '.swiper-pagination',　 // ページネーションを表示するセレクタ
    },

    // 前後スライドへのナビゲーションを表示する場合
    navigation: {
      nextEl: '.swiper-button-next', // 次のスライドボタンのセレクタ
      prevEl: '.swiper-button-prev', // 前のスライドボタンのセレクタ
    },
  });