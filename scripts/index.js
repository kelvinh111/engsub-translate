/**
 * index.js
 * - All our useful JS goes here, awesome!
 */

let app = new Vue({
  el: "#app",
  data() {
    return {
      programme: 'prison',
      list: [
'走進世界各式天牢.哥倫比亞：毒梟監獄',
'走進世界各式天牢.哥斯大黎加：雙面刃監獄',
'走進世界各式天牢.墨西哥',
'走進世界各式天牢.宏都拉斯',
'走進世界各式天牢.巴布亞新幾內亞：越獄監獄',
'走進世界各式天牢.巴拉圭：地表最危險監獄',
'走進世界各式天牢.巴西：幫派監獄',
'走進世界各式天牢.德國：治療監獄',
'走進世界各式天牢.挪威：完美的監獄？',
'走進世界各式天牢.模里西斯：極端懲罰監獄',
'走進世界各式天牢.波蘭',
'走進世界各式天牢.烏克蘭：戰亂下的監獄',
'走進世界各式天牢.羅馬尼亞：吉普賽監獄',
'走進世界各式天牢.菲律賓',
'走進世界各式天牢.貝里斯：擁抱神的監獄',
'走進世界各式天牢.賴索托：面對性暴力'
      ],
      ch: "",
      en: "",
      ep: 0,
      loading: false
    };
  },
  methods: {
    clean(text) {
      return text
        .replace(/<[^>]+>/g, "")
        .replace(/position(.*)/g, "")
        .replace(/(.*)-->(.*)\n/g, "")
        .replace(/WEBVTT((.|\n)*)SegmentIndex/g, "")
        .replace(/&lrm;/g, "");
    },
    getText() {
      this.loading = true;

      let reqEn = axios.get(
        "https://public.kelvinh.studio/en2/" +
          this.programme + '/' + 
          this.list[this.ep] +
          ".WEBRip.Netflix.en[cc].vtt"
      );

      let reqCh = axios.get(
        "https://public.kelvinh.studio/en2/" +
          this.programme + '/' + 
          this.list[this.ep] +
          ".WEBRip.Netflix.zh-Hant.vtt"
      );

      axios
        .all([reqEn, reqCh])
        .then(
          axios.spread((...res) => {
            let resEn = res[0];
            let resCh = res[1];

            this.en = this.clean(resEn.data);
            this.ch = this.clean(resCh.data);
            
            console.log(this.en)

            this.loading = false;
          })
        )
        .catch(err => {
          this.loading = false;
          console.error(err);
        });
    },
    onSelect() {
      this.getText();
    }
  },
  mounted() {
    this.getText();
  }
});
