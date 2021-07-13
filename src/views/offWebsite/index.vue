<template>
  <div class="off-website">
    <!--头部-->
    <div class="header">
      <div class="header-content">
        <div class="logo-name">
          <div class="logo">
            <img
              src="https://www.shargoodata.com/static/img/u43.c8ff24f.png"
              alt=""
            />
          </div>
          <div class="system-name">
            <span>学谷智能</span>
            <span>Shargoo Data</span>
          </div>
        </div>

        <div class="menu">
          <ul class="menu-list">
            <li
              v-for="(item, index) in ['首页', '票票查', '书法写字']"
              :key="index"
              :class="{ 'handle-li': index == menuCurrentIndex }"
              @click="handleMenu(index)"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="login-register">
          <span>注册/登录</span>
        </div>
      </div>
    </div>

    <!--内容-->
    <div class="container">
      <!-- 栏 -->
      <div class="content">
        <ul class="ul-list" v-for="(item, index) in otherList" :key="index">
          <li class="li-list">
            <div class="li-span">{{ item.label }}</div>
            <div
              class="container-list"
              v-for="(childItem, childIndex) in item.children"
              :key="childIndex"
            >
              <span>{{ childItem.label }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- 公司介绍 -->
      <div class="introduce">
        <div class="intro-name">公司介绍</div>
        <div class="detail-info">
          <p class="p-info">
            学谷智能是一家致力于三维空间文字识别算法研究的机器视觉公司，
          </p>
          <p class="p-info">
            成立于2018年9月19日，由来自蚂蚁金服、英国思克莱德大学（University of
            Strathclyde）人工智能研究院的算法工程师一起创建成立；
          </p>
          <p class="p-info">
            学谷目前研究的内容是自然环境下拍摄的证件文字识别，能够对于指定的身份证件，登记证件，在复杂的自然条件下拍摄的照片做准确的文字识别，能够较好的
          </p>
          <p class="p-info">
            解决非扫描文件的文字打印错位、倾斜文字的识别问题；
          </p>
        </div>
      </div>

      <!--合作伙伴-->
      <div class="cooper-friend">
        <div class="friend-name">合作伙伴</div>
        <div class="friend-list">
          <div class="list" v-for="(item, index) in friendList" :key="index">
            <img :src="item.img" alt="" />
            <span>{{ item.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!--商务合作-->
    <div class="busin-cooper-wrapper">
      <div class="busin-cooper">
        <div class="busin-name">
          <span>商务合作</span>
        </div>
        <div class="detail">
          <p class="details-info">
            <span>电话：</span>
            <span>13606527403</span>
          </p>
          <p class="details-info">
            <span>邮箱：</span>
            <span>kongfang@shargoodata.com</span>
          </p>
          <p class="details-info">
            <span>地址：</span>
            <span>杭州市文一路1378号杭师大科技园E幢1702</span>
          </p>
        </div>
      </div>
    </div>

    <!--微信服务号-->
    <div class="wc-service-no">
      <div class="wc-name">
        <span>微信服务号</span>
      </div>
      <div class="wc-qr-code">
        <img
          src="https://www.shargoodata.com/static/img/u35.9ef86c3.jpg"
          alt=""
        />
      </div>
    </div>

    <!--底部详情-->
    <div class="footer-detail">
      <div class="detail">
        <div class="details-info">
          <span>如果您对于本文内容有任何问题或建议，请告诉我们。</span>
          <span class="submit-feedback">提交反馈</span>
          <span class="user-agreement">用户协议</span>
        </div>
        <div class="details-info">
          <span>© 2018-2020 杭州学谷智能科技有限公司 版权所有</span>
          <a class="record-no">浙ICP备19004244号</a>
        </div>
      </div>
    </div>

    <!--登录注册-->
    <div class="login-register">
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuCurrentIndex: 0,
      otherList: [
        {
          label: "身份证件",
          children: [
            { label: "身份证" },
            { label: "港澳通行证" },
            { label: "营业执照" },
            { label: "银行卡" },
            { label: "增值税发票" },
          ],
        },
        {
          label: "车辆证件",
          children: [
            { label: "机动车登记证" },
            { label: "行驶证" },
            { label: "驾驶证" },
          ],
        },
        {
          label: "人脸识别",
          children: [{ label: "1:N人脸搜索" }],
        },
        {
          label: "数据校验",
          children: [
            { label: "实名认证" },
            { label: "实人认证" },
            { label: "银行卡认证" },
          ],
        },
      ],
      friendList: [
        {
          img: "https://www.shargoodata.com/static/img/u33.7100af5.jpg",
          label: "Beefintech",
        },
        {
          img: "https://www.shargoodata.com/static/img/u34.a6fdaf9.png",
          label: "云享",
        },
        {
          img: "https://www.shargoodata.com/static/img/u36.44cbfbf.png",
          label: "会务家",
        },
      ],
    };
  },
  methods: {
    /**点击菜单 */
    handleMenu(index) {
      this.menuCurrentIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin fontStyle {
  font-weight: 700;
  font-size: 25px;
  color: #003;
  font-weight: 700px;
  font-family: "\5B8B\4F53 Bold", "\5B8B\4F53 \5E38\89C4", "\5B8B\4F53";
}
.off-website {
  background-color: #fff;
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
  .header {
    color: #fff;
    height: 90px;
    background-color: #333;
    .header-content {
      width: 1092px;
      height: inherit;
      margin: 0 auto;
      display: flex;
      .logo-name {
        flex: 1;
        display: flex;
        align-items: center;
        div {
          margin: 0 10px;
        }
        .logo {
          img {
            height: 48px;
            width: 48px;
          }
        }

        .system-name {
          span {
            display: block;
            word-break: normal;
            width: auto;
            height: 21px;
            font-family: Helvetica Neue, Helvetica, PingFang SC,
              Hiragino Sans GB, Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", Arial,
              sans-serif;
            white-space: pre-wrap;
            word-wrap: break-word;
            overflow: hidden;
            font-size: 20px;
          }
        }
      }

      .menu {
        flex: 3;
        height: inherit;
        margin-left: 20px;
        .menu-list {
          list-style: none;
          height: 90px;
          display: flex;
          li {
            padding: 0 20px;
            font-size: 18px;
            color: #fff;
            line-height: 90px;
            margin-right: 30px;
          }
          li:hover {
            background: #232323;
          }
          .handle-li {
            color: #ff6666;
            border-bottom: 2px solid #ff6666;
          }
        }
      }

      .login-register {
        flex: 1;
        height: inherit;
        text-align: center;
        span {
          font-size: 18px;
          line-height: 90px;
          padding: 12px 20px;
          cursor: pointer;
        }
      }
    }
  }

  .container {
    width: 1092px;
    margin: 45px auto 0;
    // position: relative;
    // top: 45px;

    .content {
      display: flex;
      box-sizing: border-box;
      .ul-list {
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: center;

        .li-list:first-child {
          width: 100%;
          .li-span {
            width: 80%;
            display: block;
            height: 36px;
            background-color: #ff6666;
            color: #fff;
            border-radius: 4px;
            text-align: center;
            line-height: 36px;
            font-size: 16px;
            cursor: pointer;
            margin-bottom: 20px;
          }

          .container-list {
            width: 80%;
            text-align: center;
            line-height: 36px;
            color: #6b6b6b;
            font-family: "\5B8B\4F53 \5E38\89C4", "\5B8B\4F53";
            font-size: 14px;
          }
        }
      }
    }

    .introduce {
      width: 1092px;
      margin-top: 60px;
      .intro-name {
        @include fontStyle;
      }

      .detail-info {
        margin-top: 30px;
        .p-info {
          margin-bottom: 16px;
          font-style: normal;
          font-size: 14px;
          font-family: Arial Normal, Arial;
        }
      }
    }

    .cooper-friend {
      width: 1092px;
      margin: 60px auto 0;
      .friend-name {
        @include fontStyle;
      }

      .friend-list {
        width: 1092px;
        display: flex;
        img {
          width: 90px;
          height: 90px;
        }
        .list {
          display: flex;
          flex-direction: column;
          margin: 20px 30px;
          align-items: center;
          span {
            display: block;
            margin-top: 10px;
            font-family: Arial Normal, Arial;
            font-size: 28px;
          }
        }
      }
    }
  }
  .busin-cooper-wrapper {
    height: 170px;
    width: 100%;
    background-color: #c9c9c9;
    .busin-cooper {
      width: 1092px;
      margin: 60px auto 0;
      .busin-name {
        @include fontStyle;
        box-sizing: border-box;
        padding: 24px 0 12px;
      }

      .detail {
        .details-info {
          margin-bottom: 12px;
        }
      }
    }
  }

  .wc-service-no {
    width: 1092px;
    margin: 60px auto 0;
    .wc-name {
      @include fontStyle;
    }
    .wc-qr-code {
      margin-top: 20px;
      img {
        width: 170px;
        height: 170px;
      }
    }
  }

  .footer-detail {
    width: 100%;
    height: 170px;
    background-color: #c9c9c9;
    margin-top: 60px;
    .detail {
      width: 1092px;
      margin: 0 auto;
      .details-info {
        padding: 20px 0;
        .submit-feedback,
        .user-agreement {
          color: #fff000;
          cursor: pointer;
        }

        .record-no {
          cursor: pointer;
          color: #0000ee;
          text-decoration: underline;
        }
        span {
          padding-right: 10px;
        }
      }
    }
  }
}
</style>