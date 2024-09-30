import express from "express";
import { add_new_contact, adduser,Contact_new_user, Contact_old_user, requested_users, updateProfile } from "../Controller/UserController.js";
import {  mobileauth, Update_user_name } from "../Controller/Authentication.js";
import {  addnewconversation, getconversationdetails } from "../Controller/Conversation.js";
import { getallmsg, message, update_usermsgnotifier } from "../Controller/Message.js";
import { getaudiodownloadurl, getfiledownloadurl, getimgdownloadurl, newimg, newpdf, uploadaudio, uploadvideo } from "../Controller/File.js";
import { get_all_request, request_to_conect ,update_request} from "../Controller/Notification.js";
import { qrcodegenerator } from "../Controller/Qrcode.js";
import { Add_Status, Delete_My_status, Get_all_Stausids, Get_My_Status, get_status_details, update_status_view } from "../Controller/Status.js";
import { CreateGroup, Get_group, Get_group_conversionid } from "../Controller/Group.js";

const route=express.Router();

route.post('/adduser',adduser);
route.get('/contact/new/users',Contact_new_user);
route.post('/contact/old/users',Contact_old_user);

route.post('/user/update/name',Update_user_name);
route.post('/user/update/profile',updateProfile);

route.post('/contact/add/new/contact',add_new_contact);

route.post('/mobileauthentication',mobileauth);
route.post('/new/conversation',addnewconversation);
route.post('/get/conversationdetails',getconversationdetails);
route.post('/new/message',message);
route.post('/get/allmessages',getallmsg);
route.post('/chat/pdf/upload',newpdf);
route.post('/chat/pdf/download',getfiledownloadurl);
route.post('/chat/photos/upload',newimg);
route.post('/chat/photos/download',getimgdownloadurl);
route.post('/chat/audio/upload',uploadaudio);
route.post('/chat/audio/download',getaudiodownloadurl);
route.post('/chat/video/upload',uploadvideo);

route.post('/clear/notifier',update_usermsgnotifier);

route.post('/request/new/user',request_to_conect);
route.post('/request/get/all',get_all_request);
route.post('/request/get/notification',requested_users);
route.post('/request/update/status',update_request);
route.get('/generate-qr', qrcodegenerator);


route.post('/add/new/status',Add_Status);
route.post('/get/status/details',get_status_details);
route.post('/get/status/update',update_status_view);
route.post('/get/my/status',Get_My_Status);
route.post('/delete/my/status', Delete_My_status);
route.post('/get/all/statusids', Get_all_Stausids);

route.post('/create/group',CreateGroup);
route.post('/get/group',Get_group);
route.post('/get/group/conversationid',Get_group_conversionid);
  
export default route;