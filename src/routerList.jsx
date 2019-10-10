import AsyncComponent from './component/AsyncComponents/index.jsx';
export default [
    {
        name: "login",
        path:"/login",
        component: AsyncComponent(() => import(/*webpackChunkName: "login"*/'./component/Login/index.jsx'))
    },
    {
        name: "home",
        path:"/",
        component: AsyncComponent(() => import(/*webpackChunkName: "home"*/'./component/Home/index.jsx'))
    },
    {
        name: "setWeChatName",
        path:"/setWeChatName",
        component: AsyncComponent(() => import(/*webpackChunkName: "home"*/'./component/Home/setWeChatName.jsx'))
    },
    {
        name: "changeBind",
        path:"/changeBind",
        component: AsyncComponent(() => import(/*webpackChunkName: "home"*/'./component/ChangeBind/index.jsx'))
    },
    {
        name: "integralRecode",
        path:"/integralRecode",
        component: AsyncComponent(() => import(/*webpackChunkName: "integral"*/'./component/IntegralRecode/index.jsx'))
    },
    {
        name: "applicationPool",
        path:"/applicationPool",
        component: AsyncComponent(() => import(/*webpackChunkName: "applicationPool"*/'./component/ApplicationPool/index.jsx'))
    },
    {//矿池列表
        name: "poolList",
        path:"/poolList",
        component: AsyncComponent(() => import(/*webpackChunkName: "manageMent"*/'./component/management/index.jsx'))
    },
    {//矿池管理
        name: "manageMent",
        path:"/manageMent",
        component: AsyncComponent(() => import(/*webpackChunkName: "manageMent"*/'./component/management/management.jsx'))
    },
    {
        name: "ai",
        path:"/manageMent/ai",
        component: AsyncComponent(() => import(/*webpackChunkName: "manageMent"*/'./component/Ai/index.jsx'))
    },
    {
        name: "poolSet",
        path:"/manageMent/poolSet",
        component: AsyncComponent(() => import(/*webpackChunkName: "manageMent"*/'./component/PoolSet/index.jsx'))
    },
    {
        name: "keyWord",
        path:"/manageMent/keyWord",
        component: AsyncComponent(() => import(/*webpackChunkName: "manageMent"*/'./component/keyWord/index.jsx'))
    },
    {
        name: "timeTask",
        path:"/manageMent/timeTask",
        component: AsyncComponent(() => import(/*webpackChunkName: "manageMent"*/'./component/TimeTask/index.jsx'))
    },
    {
        name: "editPoolName",
        path:"/manageMent/poolSet/editPoolName",
        component: AsyncComponent(() => import(/*webpackChunkName: "manageMent"*/'./component/PoolSet/editPoolName.jsx'))
    },
    {
        name: "editKeyWord",
        path:"/manageMent/poolSet/editKeyWord",
        component: AsyncComponent(() => import(/*webpackChunkName: "manageMent"*/'./component/PoolSet/editPoolKeyWord.jsx'))
    },
    {
        name: "editWelcome",
        path:"/manageMent/poolSet/editWelcome",
        component: AsyncComponent(() => import(/*webpackChunkName: "manageMent"*/'./component/PoolSet/editWelcome.jsx'))
    },
    {
        name: "editNews",
        path:"/manageMent/poolSet/editNews",
        component: AsyncComponent(() => import(/*webpackChunkName: "manageMent"*/'./component/PoolSet/editNews.jsx'))
    },
    {
        name: "toEditPuid",
        path:"/manageMent/poolSet/toEditPuid",
        component: AsyncComponent(() => import(/*webpackChunkName: "manageMent"*/'./component/PoolSet/editPuid.jsx'))
    },
    {
        name: "qr",
        path:"/manageMent/poolSet/qr",
        component: AsyncComponent(() => import(/*webpackChunkName: "manageMent"*/'./component/PoolSet/qr.jsx'))
    },
    {
        name: "toEditWeChat",
        path:"/manageMent/poolSet/toEditWeChat",
        component: AsyncComponent(() => import(/*webpackChunkName: "manageMent"*/'./component/PoolSet/editPoolWeChat.jsx'))
    },
    {
        name: "addTask",
        path:"/addTask",
        component: AsyncComponent(() => import(/*webpackChunkName: "manageMent"*/'./component/TimeTask/addTask.jsx'))
    },
    {
        name: "modifyTask",
        path:"/modifyTask",
        component: AsyncComponent(() => import(/*webpackChunkName: "manageMent"*/'./component/TimeTask/modifyTask.jsx'))
    },
    {
        name: "addKeyWord",
        path:"/addKeyWord",
        component: AsyncComponent(() => import(/*webpackChunkName: "manageMent"*/'./component/keyWord/addKeyWord.jsx'))
    },
    {
        name: "modifyKeyWord",
        path:"/modifyKeyWord",
        component: AsyncComponent(() => import(/*webpackChunkName: "manageMent"*/'./component/keyWord/modifyKeyWord.jsx'))
    },
    {//手机绑定
        name: "bindPhone",
        path:"/bindPhone",
        component: AsyncComponent(() => import(/*webpackChunkName: "bindPhone"*/'./component/BindPhone/index.jsx'))
    },
    {//所属矿池选择矿池
        name: "selectDomain",
        path:"/selectDomain",
        component: AsyncComponent(() => import(/*webpackChunkName: "selectDomain"*/'./component/SelectDomain/index.jsx'))
    },
    {//荣耀积分
        name: "gloryIntegral",
        path:"/gloryIntegral",
        component: AsyncComponent(() => import(/*webpackChunkName: "gloryIntegral"*/'./component/GloryIntegral/index.jsx'))
    },
    {
        name: "changeCode",
        path:"/changeCode",
        component: AsyncComponent(() => import(/*webpackChunkName: "gloryIntegral"*/'./component/GloryIntegral/changeCode.jsx'))
    },
    {
        name: "leaveMessage",
        path:"/leaveMessage",
        component: AsyncComponent(() => import(/*webpackChunkName: "gloryIntegral"*/'./component/GloryIntegral/LeaveMessage.jsx'))
    },
    {//荣耀榜
        name: "leaderBoard",
        path:"/leaderBoard",
        component: AsyncComponent(() => import(/*webpackChunkName: "leaderBoard"*/'./component/LeaderBoard/index.jsx'))
    },
    {
        name: "zancai",
        path:"/zancai",
        component: AsyncComponent(() => import(/*webpackChunkName: "leaderBoard"*/'./component/LeaderBoard/zanCai.jsx'))
    },
    {//邀请
        name: "invite",
        path:"/invite",
        component: AsyncComponent(() => import(/*webpackChunkName: "invite"*/'./component/Invite/index.jsx'))
    },
    {//抽奖
        name: "lottery",
        path:"/lottery",
        component: AsyncComponent(() => import(/*webpackChunkName: "lottery"*/'./component/Lottery/index.jsx'))
    },
    {//抽奖充值
        name: "lottery",
        path:"/lottery/recharge",
        component: AsyncComponent(() => import(/*webpackChunkName: "lottery"*/'./component/Lottery/recharge.jsx'))
    },
    {//充值记录
        name: "lottery",
        path:"/lottery/recharge/rechargeRecode",
        component: AsyncComponent(() => import(/*webpackChunkName: "lottery"*/'./component/Lottery/rechargeRecode.jsx'))
    },
    {
        name: "exchangeInfoEdit",
        path:"/lottery/exchangeInfoEdit",
        component: AsyncComponent(() => import(/*webpackChunkName: "lottery"*/'./component/Lottery/exchangeInfoEdit.jsx'))
    },
    {//广告
        name: "ad",
        path:"/ad",
        component: AsyncComponent(() => import(/*webpackChunkName: "ad"*/'./component/Advertising/index.jsx'))
    },
    {
        name: "adInfo",
        path:"/ad/adInfo",
        component: AsyncComponent(() => import(/*webpackChunkName: "ad"*/'./component/Advertising/adInfo.jsx'))
    },
    {
        name: "release",
        path:"/ad/release",
        component: AsyncComponent(() => import(/*webpackChunkName: "ad"*/'./component/Advertising/release.jsx'))
    },
    {
        name: "adList",
        path:"/ad/adList",
        component: AsyncComponent(() => import(/*webpackChunkName: "ad"*/'./component/Advertising/adList.jsx'))
    },
    {
        name: "myAdList",
        path:"/ad/myAdList",
        component: AsyncComponent(() => import(/*webpackChunkName: "ad"*/'./component/Advertising/myAdList.jsx'))
    },
    {//提名投票
        name: "vote",
        path:"/vote",
        component: AsyncComponent(() => import(/*webpackChunkName: "vote"*/'./component/vote/index.jsx'))
    },
    {
        name: "voteList",
        path:"/vote/voteList",
        component: AsyncComponent(() => import(/*webpackChunkName: "vote"*/'./component/vote/vote_list.jsx'))
    },
    {
        name: "myVoteList",
        path:"/vote/myVoteList",
        component: AsyncComponent(() => import(/*webpackChunkName: "vote"*/'./component/vote/my_vote_list.jsx'))
    },
    {
        name: "mall",
        path:"/mall",
        component: AsyncComponent(() => import(/*webpackChunkName: "merchants"*/'./component/mall/tab.jsx'))
    },
    {
        name: "goodsInfo",
        path:"/mall/goods/goodsInfo/:id",
        component: AsyncComponent(() => import(/*webpackChunkName: "merchants"*/'./component/mall/goodsInfo.jsx'))
    },
    {
        name: "goodsAddress",
        path:"/mall/goods/address/:id",
        component: AsyncComponent(() => import(/*webpackChunkName: "merchants"*/'./component/mall/goodsAddress.jsx'))
    },
    {
        name: "goodsAddress",
        path:"/mall/goods/addressList/:type",
        component: AsyncComponent(() => import(/*webpackChunkName: "merchants"*/'./component/mall/AddressList.jsx'))
    },
    {
        name: "payOrder",
        path:"/mall/goods/payOrder",
        component: AsyncComponent(() => import(/*webpackChunkName: "merchants"*/'./component/mall/payOrder.jsx'))
    },
    {
        name: "myOrder",
        path:"/mall/myOrder",
        component: AsyncComponent(() => import(/*webpackChunkName: "merchants"*/'./component/mall/tab.jsx'))
    },
    {
        name: "merchants",
        path:"/mall/merchants",
        component: AsyncComponent(() => import(/*webpackChunkName: "merchants"*/'./component/mall/tab.jsx'))
    },
    {
        name: "merchants",
        path:"/mall/merchants/apply/:id",
        component: AsyncComponent(() => import(/*webpackChunkName: "merchants"*/'./component/mall/applicationAgent.jsx'))
    },
    {
        name: "merchants",
        path:"/mall/merchants/myPaymentInfo",
        component: AsyncComponent(() => import(/*webpackChunkName: "merchants"*/'./component/mall/myPaymentInfo.jsx'))
    },
    {
        name: "merchants",
        path:"/mall/merchants/modifyPayment/:type",
        component: AsyncComponent(() => import(/*webpackChunkName: "merchants"*/'./component/mall/applicationAgentPayment.jsx'))
    },
    {
        name: "merchants",
        path:"/mall/merchants/Commission",
        component: AsyncComponent(() => import(/*webpackChunkName: "merchants"*/'./component/mall/commission.jsx'))
    }
]