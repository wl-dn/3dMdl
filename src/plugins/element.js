/*
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-08-18 17:39:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-22 11:28:06
 */
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';


import {

    Message,
    MessageBox,
    Button,
    Checkbox,
    Table,
    TableColumn,
    ColorPicker,
    Input,
    Loading,
    Tabs,
    TabPane,
    Radio,
    Select,
    Option,
    RadioGroup,
    Tooltip,
    Switch,
    Tag,
    DatePicker,
    Upload,
    Row,
    Col,
    Pagination,
    Dialog,
    Form,
    FormItem,
    Drawer,
    Progress,
    Cascader,
    Container,
    Aside,
    Main,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Collapse,
    CollapseItem,
    Divider,
    Image,
    Steps,
    Step,
    TimePicker,
    Tree,
    Breadcrumb,
    BreadcrumbItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Card,
    Slider,
    InputNumber,
    Autocomplete

} from 'element-ui'

Vue.use(TimePicker);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Divider);
Vue.use(Image);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(ColorPicker);
Vue.use(Input);
Vue.use(Loading);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Radio);
Vue.use(Select);
Vue.use(Option);
Vue.use(Upload);
Vue.use(RadioGroup);
Vue.use(Tooltip);
Vue.use(Switch);
Vue.use(Tag);
Vue.use(DatePicker);
Vue.use(Upload);
Vue.use(Row);
Vue.use(Col);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Drawer)
Vue.use(Progress)
Vue.use(Cascader);
Vue.use(Aside)
Vue.use(Main)
Vue.use(Container)
Vue.use(Tree)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Card)
Vue.use(Slider)
Vue.use(InputNumber)
Vue.use(Autocomplete)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert

