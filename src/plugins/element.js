import Vue from "vue";
import {
  Button,
  Form,
  FormItem,
  Input,
  Icon,
  Card,
  Header,
  Container,
  Aside,
  Menu,
  MenuItem,
  Main,
  PageHeader,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Table,
  TableColumn,
  Tag,
  Dialog,
  MessageBox,
  Message,
  Loading,
  Col
} from "element-ui";

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Card);
Vue.use(Header);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Main);
Vue.use(PageHeader);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tag);
Vue.use(Dialog);
Vue.use(Col);
Vue.use(Loading.directive);

const msgbox = MessageBox;
Vue.prototype.$msgbox = msgbox;
Vue.prototype.$alert = msgbox.alert;
Vue.prototype.$confirm = msgbox.confirm;
Vue.prototype.$prompt = msgbox.prompt;
Vue.prototype.$message = Message;
