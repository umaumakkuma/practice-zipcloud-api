(() => {
  const submit = document.getElementById("js-submit");
  const errorText = document.getElementById("js-error-text");

  // 住所取得
  const fetchAddress = (zipcode) => {
    fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        checkErrors(data);
        displayAddress(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // エラーチェック
  const checkErrors = (data) => {
    if (data["results"] === null) {
      errorText.classList.add("show");
      return;
    }
    // 念の為エラーメッセージ非表示
    errorText.classList.remove("show");
  };

  // 取得データの画面表示
  const displayAddress = (data) => {
    document.getElementById("js-address1").textContent =
      data["results"][0]["address1"];
    document.getElementById("js-address2").textContent =
      data["results"][0]["address2"];
    document.getElementById("js-address3").textContent =
      data["results"][0]["address3"];
    document.getElementById("js-kana1").textContent =
      data["results"][0]["kana1"];
    document.getElementById("js-kana2").textContent =
      data["results"][0]["kana2"];
    document.getElementById("js-kana3").textContent =
      data["results"][0]["kana3"];
  };

  submit.addEventListener("click", () => {
    const zipcode = document.getElementById("js-zipcode").value;
    fetchAddress(zipcode);
  });
})();
