import {axiosGet, axiosPost} from './axios.jsx';
import {ajax} from './axios.jsx';

//通过邀请链接获取微信昵称
export const GetWeChatName = (params, suc_func, error_func) => {
    const api_url = '/api/user/get_code_wechat.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//注册
export const Register = (params, suc_func, error_func) => {
    const api_url = '/api/user/reg_phone.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//登录
export const UserLogin = (params, suc_func, error_func) => {
    const api_url = '/api/user/lgn_phone.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//重置密码
export const ResetPassword = (params, suc_func, error_func) => {
    const api_url = '/api/user/rst_pw_phone.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//统计访问量
export const CntGetApi = (params, suc_func, error_func) => {
    const api_url = '/api/plugin/cnt_action.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
}

//获取手机短信验证码
export const GetSmsCode = (params, suc_func, error_func) => {
    const api_url = '/api/user/sms_send.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//微信登录绑定手机
export const WeChatLoginBindPhone = (params, suc_func, error_func) => {
    const api_url = '/api/user/bind_phone.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//获取基本信息
export const GetInfoBase = (params) => ajax('/api/user/info_base.php', params);

//提升荣耀积分
export const UpGloryIntegral = (params) => ajax('/api/user/turn_ccvt_integral.php', params);

//留言
export const LeaveMessage = (params) => ajax('/api/user/bnd_leave_message.php', params);

//留言列表
export const LeaveMessageList = (params) => ajax('/api/leaderBoard/leave_message_list.php', params);

//修改账户昵称
export const ModifyAccountName = (params, suc_func, error_func) => {
    const api_url = '/api/user/alter_us_account.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//修改-绑定微信昵称
export const ModifyBindWeChat = (params, suc_func, error_func) => {
    const api_url = '/api/user/bnd_wechat.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//提升荣耀积分
export const UpPoor = (params, suc_func, error_func) => {
    const api_url = '/api/user/turn_ccvt_integral.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//开启关闭快捷踩赞
export const PointTread = (params, suc_func, error_func) => {
    const api_url = '/api/user/point_tread_switch.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//获取矿池类型
export const GetPoolType = (params, suc_func, error_func) => {
    const api_url = '/api/user/get_group_type_list.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//申请矿池
export const ApplicationPool = (params, suc_func, error_func) => {
    const api_url = '/api/user/application_group.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//获取key_code
export const GetKeyCode = (params, suc_func, error_func) => {
    const api_url = '/api/user/get_key_code.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//上传图片
export const UploadImg = (params, suc_func, error_func, progress_func = null) => {
    const api_url = '/api/plugin/upload_file.php';
    const api_data = params;
    axiosPost(api_url, api_data, suc_func, error_func, progress_func);
};

//获取矿池设置信息
export const GetPoolInfo = (params, suc_func, error_func) => {
    const api_url = '/api/bot_web/group_list.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//修改矿池设置
export const ModifyPoolSet = (params, suc_func, error_func) => {
    const api_url = '/api/bot_web/group_edit.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//AI登录状态
export const AiLoginState = (params, suc_func, error_func) => {
    const api_url = '/api/bot/get_qrcode.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//退出ai登录
export const AiLogOut = (params, suc_func, error_func) => {
    const api_url = '/api/bot/bot_alive.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//获取定时任务
export const TaskHttp = (params) => ajax('/api/bot_web/timer_list.php', params);

//删除定时任务
export const DelTask = (params, suc_func, error_func) => {
    const api_url = '/api/bot_web/timer_del.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//添加定时任务
export const AddTaskHttp = (params, suc_func, error_func) => {
    const api_url = '/api/bot_web/timer_add.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//编辑定时任务
export const EditTaskHttp = (params, suc_func, error_func) => {
    const api_url = '/api/bot_web/timer_edit.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//添加关键字
export const AddKeyWord = (params, suc_func, error_func) => {
    const api_url = '/api/bot_web/key_words_add.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//获取关键字列表
export const GetKeyWordList = (params, suc_func, error_func) => {
    const api_url = '/api/bot_web/key_words_list.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//删除关键字
export const DeleteKeyWord = (params, suc_func, error_func) => {
    const api_url = '/api/bot_web/key_words_del.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//修改关键字
export const ModifyKeyWord = (params, suc_func, error_func) => {
    const api_url = '/api/bot_web/key_words_edit.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//获取账户积分变动记录
export const GetRecode = (params) => ajax('/api/user/log_balance.php', params);

//获取荣耀榜
export const GetHonorList = (params) => ajax('/api/leaderBoard/leaderboard.php', params);

//获取矿池列表
export const GetGroupList = (params) => ajax('/api/group_info/group_list.php', params);

//点赞/砸踩
export const GiveLike = (params, suc_func, error_func) => {
    const api_url = '/api/leaderBoard/give_like.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//赞踩上限
export const GiveLikeCeil = (params, suc_func, error_func) => {
    const api_url = '/api/leaderBoard/praise_or_pointon_num.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//切换成个人登录
export const ToggleAILogin = (params, suc_func, error_func) => {
    const api_url = '/api/bot_web/up_us_id.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//选择矿池加入
export const SelectDomainList = (params, suc_func, error_func) => {
    const api_url = '/api/group_info/select_domain_list.php';
    const api_data = params;
    axiosGet(api_url, api_data, suc_func, error_func);
};

//邀请记录
export const InviteRecode = (params) => ajax('/api/user/invited_record.php', params);

//选择大白列表
export const SelectAiList = (params) => ajax('/api/bot_web/bot_list.php', params);

//刷新余额
export const RefreshAmount = (params) => ajax('/api/prize/refresh_amount.php', params);

//抽奖规则
export const LotteryRule = (params) => ajax('/api/prize/prize_config.php', params);

//抽奖
export const LotteryApi = (params) => ajax('/api/prize/prize_lucky.php', params);

//中奖记录
export const WinningRecord = (params) => ajax('/api/prize/prize_list.php', params);

//充值抽奖次数
export const RechargeCount = (params) => ajax('/api/prize/prize_price_list.php', params);

//充值记录
export const GetRechargeRecode = (params) => ajax('/api/prize/prize_order_list.php', params);

//充值下单
export const SubmitOrder = (params) => ajax('/api/prize/prize_placet_order.php', params);

//抽奖地址
export const SubmitAddress = (params) => ajax('/api/prize/prize_order_exchange.php', params);

//滚动中奖记录
export const RollingList = (params) => ajax('/api/prize/rolling_list.php', params);

//获取广告费用
export const AdCost = (params) => ajax('/api/advertising/advertising_cost.php', params);

//添加广告
export const AddAd = (params) => ajax('/api/advertising/advertising_add.php', params);

//我的发布列表
export const AdList = (params) => ajax('/api/advertising/advertising_list.php', params);

//所有发布列表
export const AllAdList = (params) => ajax('/api/advertising/advertising_all_list.php', params);

//开启关闭广告发送
export const AdSwitch = (params) => ajax('/api/advertising/advertising_close.php', params);

//广告链接点击进入
export const AdInfoClick = (params) => ajax('/api/advertising/advertising_detail.php', params);

//广告链接点击进入
export const RedEnvelopeInfo = (params) => ajax('/api/advertising/advertising_red_envelope_list.php', params);

//更换CCVT绑定
export const ChangeBindCcvt = (params) => ajax('/api/user/change_bind_ccvt.php', params);

//提交投票信息
export const SubmitVoteInfo = (params) => ajax('/api/vote/vote_add.php', params);

//获取投票列表
export const GetVoteList = (params) => ajax('/api/vote/vote_list.php',params);

//获取我对提名
export const GetMyVoteList = (params) => ajax('/api/vote/my_vote_list.php',params);

//进行投票
export const VoteGive = (params) => ajax('/api/vote/vote_give.php',params);

//积分变动记录
export const GetIntegralRecode = (params) => ajax('/api/user/us_integral_change_log.php',params);

//判断是否为代理商
export const checkIsAgentHttp = (params) => ajax('/api/shop/check_is_agent.php',params);

//获取商品列表
export const getShopListHttp = (params) => ajax('/api/shop/shop_list.php',params);

//获取商品详情
export const shopDetailHttp = (params) => ajax('/api/shop/shop_detail.php',params);

//添加修改下单地址
export const addEditAddressHttp = (params) => ajax('/api/shop/address_add_edit.php',params);

//获取收货地址
export const addressListHttp = (params) => ajax('/api/shop/address_list.php',params);

//删除地址
export const deleteAddressHttp = (params) => ajax('/api/shop/address_del.php',params);

//提交订单
export const submitOrderHttp = (params) => ajax('/api/shop/shop_placet_order.php',params);

//获取我的订单列表
export const getMyOrderListHttp = (params) => ajax('/api/shop/order_list.php',params);

//领取CCVT
export const receiveHttp = (params) => ajax('/api/shop/order_receive_ccvt.php',params);

//获取商家信息
export const getMerchantsInfoHttp = (params) => ajax('/api/shop/my_agent_info.php',params);

//获取商家信息
export const applicationAgentHttp = (params) => ajax('/api/shop/apply_agent.php',params);

//修改商家信息
export const modifyAgentHttp = (params) => ajax('/api/shop/my_agent_info_edit.php',params);

//获取收款信息
export const myPaymentInfoHttp = (params) => ajax('/api/shop/my_store_bank.php',params);

//修改收款信息
export const modifyPaymentHttp = (params) => ajax('/api/shop/my_agent_bank_edit.php',params);

//获取佣金比例信息
export const getCommissionHttp = (params) => ajax('/api/shop/store_commission_info.php',params);

//设置佣金比例信息
export const setCommissionHttp = (params) => ajax('/api/shop/store_commission_add_edit.php',params);