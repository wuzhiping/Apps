<template>
  <q-page padding style="backgroundx:#f0f0f0;" class="scoped">
     <form-create ref="f" v-model="xxx" :rule="rule" :option="option"></form-create>
     <Row v-if="!loading">
        <i-col span="7" offset="7">
           <i-button type="error" @click="onSubmit">送出 Submit</i-button>
        </i-col>
        <i-col span="7" offset="2">
           <i-button type="info" @click="onReset">取消 Reset</i-button>
        </i-col>
     </Row>
     <br>
  </q-page>
</template>

<script lang="javascript">
import Vue from 'vue';
import { Notify } from 'quasar'
import formCreate from '@form-create/iview';

export default Vue.extend({
  name: 'PageForm',
  props:['formId'],
  components: { },
  data() {
     return { 
            loading: true,

            xxx:{},
            rule:[],
            option:{
              form:{
                labelPosition:'top',labelWidth:undefined,size:"large",
                showMessage:true,
              },
              row: {
                 gutter:10,
              },
              onSubmit:function(formData){
                 vm.onSubmit(formData);
              },
              submitBtn: {
                 show:false,
                 type:"info",long:true,innerText:"save",loading:false,
                 col:{ span:8}
              },
              resetBtn: false
            }
     };
  },
  methods: {
      API(url,payload){
          return this.$axios.post('https://a.feg.com.tw/BDD/API/'+url, payload);
      },
      onReset(){
          var form = this.$refs["f"].$f;
          form.disabled(false);
          form.resetFields();
      },
      onSubmit(){
          var that = this;
          var form = this.$refs["f"].$f;
          form.disabled(true);
          form.validate((valid)=>{
             if(valid){
                console.dir("验证通过");
                console.dir(form.formData());

                that.$axios.post('https://a.feg.com.tw/oauth2/form', form.formData()).then((res) => {
                    console.dir(res.data.data);
                    this.$Message.info("已提交");
                    that.$router.go(-1);
                }).catch(error => {
                        console.log(error);
                        this.$Message.error(error);
                        form.disabled(false);
                });

             }else{
                this.$Message.error("验证未通过");
                console.dir("验证未通过");
                setTimeout(function(){
                    form.disabled(false);
                },1000);
             }
          })
      }
  },
  created(){
      this.$Message.config({
        top: 70,
        duration: 8
      });


     this.$q.loading.show()
     console.dir(this.$route);
  },
  mounted: async function () {
        var that = this;
        var form = await this.API('bpm/comm/form/demo',{
                                                        uid : (this.$store.state.token || { userInfo: { user: {} }}).userInfo.user.account || 'vip05',
                                                        pwd : '',
                                                     formId : this.$route.params.formId 
                              })
                             .catch((error)=>{ 
                                  this.$Message.error("Sorry!,Try Again<br>"+error); 
                             });

        this.$q.loading.hide()

        if(form){
           this.loading = false;
           this.rule = formCreate.parseJson(JSON.stringify(form.data));
           for(var n=0;n<this.rule.length;n++){
              if(this.rule[n].field == "title"){
                break;
              }
           }
        } else {
           this.$router.go(-1);   
           return;
        }
        this.$q.notify({
           message: '<em>I can</em> <span style="color: red">use</span> <strong>HTML</strong>',
           html: true
        });
  }// END mounted

});
</script>

<style lang="stylus" scoped>
.scoped >>> h4
  font-size 100%

.scoped >>> .ivu-form, .scoped >>> .ivu-row
  max-width 800px
.scoped >>> .ivu-form
  .ivu-form-item-label
    font-weight bold
    opacity 0.9
    font-size 14px
    vertical-align middle
    display inline-block
    overflow hidden
    text-overflow ellipsis
    white-space nowrap

.scoped >>> .ivu-form-item-error-tip
  padding-top 0
  font-size 8px
.scoped >>> .ivu-input-wrapper-large
  .ivu-input-icon
    line-height 32px
  .ivu-input-prefix
    i
      line-height 32px
  .ivu-input-suffix
    i
      line-height 32px
.scoped >>> .ivu-form-item
  margin-bottom 14px

.scoped >>> .search-loading
    margin-top 30%
    display flex
    justify-content center

</style>

