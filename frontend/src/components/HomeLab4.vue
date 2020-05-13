<template>
  <div id="lab">
    <h1>
      Lab4 会议组织与投稿 小组实验报告
    </h1>
    <p><strong>小组成员</strong>： 潘星宇 胡彧锋 颜华</p>
    <p><strong>管理员账号</strong>：账号名：admin 密码：adminPass</p>
    <h2>一、DevCloud 项目规划</h2>
    <h3>项目需求规划</h3>
    <ul>
      <li><strong>前端</strong></li>
    </ul>
    <p><img src="lab4/image-20200509231202450.png" alt="image-20200509231202450" /></p>
    <ul>
      <li><strong>后端</strong></li>
    </ul>
    <p><img src="lab4/image-20200509232012757.png" alt="image-20200509232012757" /></p>
    <h2>二、项目成果概况</h2>
    <ul>
      <li>
        <strong>
          主页：
        </strong>
      </li>
    </ul>
    <p><img src="lab4/image-20200509185047986.png" alt="image-20200509185047986" /></p>
    <p>系统主页，提供登录和注册两个功能</p>
    <ul>
      <li>
        <strong>
          系统主界面：
        </strong>
      </li>
    </ul>
    <p><img src="lab4/image-20200509190251091.png" alt="image-20200509190251091" /></p>
    <p>此界面为用户登录后跳转至的界面，默认为会议广场，显示所有的会议，双击会议可查看会议详细信息并进行相关操作。可通过左边的导航栏跳转到申请会议、参与会议、个人信息等页面。</p>
    <ul>
      <li>
        <strong>
          会议申请界面
        </strong>
      </li>
    </ul>
    <p><img src="lab4/image-20200509185729056.png" alt="image-20200509185729056" /></p>
    <ul>
      <li>
        <strong>用户已申请的会议界面</strong>
      </li>
    </ul>
    <p><img src="lab4/image-20200509190110217.png" alt="image-20200509190110217" /></p>
    <p>此页面用于显示用户已经申请的会议，分为等待处理，已通过和已拒绝三类分别查看。</p>
    <ul>
      <li>
        <strong>
          用户参与的会议界面
        </strong>
      </li>
    </ul>
    <p><img src="lab4/image-20200509190331173.png" alt="image-20200509190331173" /></p>
    <p>此页面用于显示用户作为不同角色参与的会议。</p>
    <p>双击会议查看会议详细信息并进行相关操作。</p>
    <p><img src="lab4/image-20200509190452631.png" alt="image-20200509190452631" /></p>
    <ul>
      <li>
        <strong>
          个人中心
        </strong>
      </li>
    </ul>
    <p><img src="lab4/image-20200509190702958.png" alt="image-20200509190702958" /><img src="lab4/image-20200509190844056.png" alt="image-20200509190844056" /></p>

    <p>可用过导航栏进入消息中心和个人资料界面。消息中心可查看收到的邀请信息，个人资料用以显示用户信息。</p>
    <ul>
      <li>
        <strong>
          PC Member 邀请发送界面
        </strong>
      </li>
    </ul>
    <p><img src="lab4/image-20200509191030601.png" alt="image-20200509191030601" /></p>
    <p>通过搜索用户发送请求</p>
    <ul>
      <li>
        <strong>
          Admin 审核会议页面
        </strong>
      </li>
    </ul>
    <p><img src="lab4/image-20200509200858533.png" alt="image-20200509200858533" /></p>
    <h2>三、开发过程</h2>
    <h3>（一）构建流水线</h3>
    <p><img src="lab4/image-20200510002509980.png" alt="image-20200510002509980" /></p>
    <p><img src="lab4/image-20200510002325194.png" alt="image-20200510002325194" /></p>
    <p><img src="lab4/image-20200510002528778.png" alt="image-20200510002528778" /></p>
    <h4>（二）单元测试</h4>
    <p><img src="lab4/image-20200509194730591.png" alt="image-20200509194730591" /></p>
    <p>单元测试基本是针对 service 类的，通过了所有的测试且覆盖率基本打到 90%以上。</p>
    <h4>（三）代码检查</h4>
    <p><img src="lab4/image-20200510000746109.png" alt="image-20200510000746109" /></p>
    <p><img src="lab4/image-20200509201335549.png" alt="image-20200509201335549" /></p>
    <p><img src="lab4/image-20200510000830117.png" alt="image-20200510000830117" /></p>
    <h4>（四）Git 对最后一次 commit 打 Tag</h4>
    <p><img src="lab4/image-20200510005420753.png" alt="image-20200510005420753" /></p>
    <p><img src="lab4/image-20200510010020723.png" alt="image-20200510010020723" /></p>
    <h2>四、组员任务分配情况</h2>
    <h3><strong>胡彧锋（前端）：</strong></h3>
    <ul>
      <li>重构前端代码层次逻辑</li>
      <li>作者查看、修改自己的投稿</li>
      <li>PCmember 审稿</li>
    </ul>
    <h3><strong>潘星宇（后端）：</strong></h3>
    <ul>
      <li>编写相关请求：作者查看、修改投稿；PCmember 审稿；修改审稿；chair 改变会议阶段等</li>
      <li>分配稿件</li>
    </ul>
    <h3><strong>颜华（后端）：</strong></h3>
    <ul>
      <li>JUnit 测试</li>
    </ul>
    <h2>
      五、实验过程记录及问题解决
    </h2>
    <h3><strong>阶段一：Lab3 回顾阶段 （4.24 - 5.1）</strong></h3>
    <p>对 Lab3 中未优化的代码进行完善，重构前后端，修改页面风格。</p>
    <h4>阶段二：任务分配 （5.1）</h4>
    <p>在对整个项目需求有了基本的了解之后，我们对小组内成员的任务进行了分配，初步确定开发流程和时间节点。</p>
    <h4><strong>阶段三：构建 CICD 流水线 （5.1）</strong></h4>
    <p>在华为云 DevCloud 中构建流水线，进行自动化代码集成和部署的步骤</p>
    <h4>
      <strong>阶段四：前后规范接口 （5.1 - 5.3）</strong>
    </h4>
    <p>对目前所预见的到的前后端的接口进行规范，建立接口文档。</p>
    <h4>
      阶段五：前后端分离开发 （5.3 - 5.8）
    </h4>
    <p>在统一后的接口下对前后端进行分别开发，前端以实现页面布局和样式为主</p>
    <h4>阶段六：测试以及 DEBUG （5.8 - 5.9）</h4>
    <p>前后端交互、Debug、在本地针对系统逻辑进行测试和 DEBUG。</p>
    <h4><strong>问题及解决方案</strong></h4>
    <p><strong>问题 1：</strong> 数据库存储报错：最常见的错误就是“primary key void”。</p>
    <p>
      <strong>解决：</strong> 大部分问题是因为数据库存储的对象依赖和映射问题，我们发现数据库存了很多没必要的东西，比如建立了一个 Topic 对象的数据库，A 数据库存了 B 数据库的对象，B
      数据库又存了 A 数据库的对象等等情况。最后我们选择了重新设计数据库结构，删除了 Topic 对象，而只将 topic 作为一些 String 数组处理。
    </p>
    <p><strong>问题 2：</strong> 后端不能正确接收前端传来的作者信息。</p>
    <p><strong>解决：</strong> 前端传入的作者参数是一个 String 的二维数组，而后端不支持接收一个对象数组。</p>
    <p></p>
    <h2>五、小组成员实验总结</h2>
    <h3>胡彧锋</h3>
    <p>本次实验我负责对前端进行重构，并对 LAB4 的需求进行实现。</p>
    <ul>
      <li>
        <p>前端重构</p>
        <ul>
          <li>
            <p>代码复用：</p>
            <ul>
              <li>
                <p>
                  在 LAB3 时，对于前端常出现的“表格”模块，并没有做到复用，且 VUE 中最基础的 v-for 语法都未曾使用，而是复制粘贴。以 Admin 审稿为例：改进后，由原来的 300+
                  行代码压缩至 60+ 代码
                </p>
                <p><img src="lab4/construct_frontend.png" alt="construct_frontend" /></p>
              </li>
              <li>
                <p>同样，对于一个只有“pass”和“reject”参数不同的函数，复制了一遍？？？ 👍</p>
                <p><img src="lab4/copy_method.png" alt="copy_method" /></p>
              </li>
            </ul>
          </li>
          <li>
            <p>用户友好</p>
            <ul>
              <li>
                <p>在 lab3 中，用户要邀请 PC members 需要点击操作六次，改进后，只需三次即可到达需求页面，增加了用户友好性；并做到了消息提示、操作引导</p>
                <p><img src="lab4/lab4_tip.png" alt="lab4_tip" /></p>
              </li>
              <li>
                <p>同时在主页添加了小组开发实验总结，可供互相参考学习</p>
                <p><img src="lab4/lab4_learning.png" alt="lab4_learning" /></p>
              </li>
            </ul>
          </li>
          <li>
            <p>页面美化</p>
            <ul>
              <li>
                <p>去除了 lab3 所保留的“额头”和脚垫，而采用了简洁大方的页面设计，努力做到清晰、简洁、现代化</p>
                <p><img src="lab4/lab3_frontend_page.png" alt="lab3_frontend_page" /></p>
                <p>👆 LAB3</p>
                <p><img src="lab4/lab4_frontend_page.png" alt="lab4_frontend_page" /></p>
                <p>👆 LAB4</p>
              </li>
              <li>
                <p>细节方面，lab4 采用了很多精巧的设计，如浏览器图标和页面名</p>
                <p><img src="lab4/lab4_icon.png" alt="lab4_icon" /></p>
                <p>控制台彩蛋</p>
                <p><img src="lab4/lab4_console.png" alt="lab4_console" /></p>
                <p>主页彩蛋</p>
                <p><img src="lab4/lab4_coding.png" alt="lab4_coding" /></p>
              </li>
            </ul>
          </li>
          <li>
            <p>内核升级</p>
            <ul>
              <li>
                <p>lab3 还停留在助教建的 vue-cli2 上，而 lab4 采用了最新的@vue/cli3 搭建，消除了代码的复杂性和代码的 vulnerablilities</p>
                <p><img src="lab4/lab3_audit.png" alt="lab3_audit" /></p>
                <p>👆 lab3 audit</p>
                <p><img src="lab4/lab4_audit.png" alt="lab4_audit" /></p>
                <p>👆 lab4 audit</p>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <p>LAB4 新需求</p>
        <ul>
          <li>
            <p>新需求的主要增加了 PC members 审稿页和 author 投稿页，也采用了页面一贯的风格设计</p>
            <p><img src="lab4/lab4_submitPaper.png" alt="lab4_submitPaper" /></p>
          </li>
        </ul>
      </li>
      <li>
        <p>不足</p>
        <ul>
          <li>vue 常学常新</li>
          <li>部分 components （ConferenceDetail）代码行数太长（218 行），一方面是因为要显示的信息较多，还有原因是业务逻辑复杂，需想办法分离</li>
          <li><strong>稳定的后端很重要</strong></li>
          <li>审美有待提高 🥱</li>
        </ul>
      </li>
    </ul>
    <h3>潘星宇</h3>
    <p>本次实验我负责对后端进行重构，并对 LAB4 的需求进行实现。</p>
    <ul>
      <li>
        后端重构
        <ul>
          <li>
            不够清晰的模块划分：在 LAB3 时，对于后端的模块划分停留在对于请求者身份的模糊划分上，进行了 Admin, User, Chair, Author, PCMember
            的粗略划分。首先从语义上来说，这些划分并不是并行的划分。Admin 是具有特殊权限的 User，Chair, Author, PCMember 又是依赖于某一个具体会议的角色，并且都属于
            User。因此在这种划分下，不同页面的特有的请求在 Controller 与 Service
            中混杂在一起，同时许多页面共有的请求也没有得到合适的剥离，实现代码重用。并且，后端的架构与前端架构的对应关系很弱，在 DEBUG
            阶段，一个请求需要找很久才能在后端找到，是真正的“虽丑但有”。因此重构势在必行。
          </li>
          <li>
            包，类的重命名：首先，重构对于从 Request 到 Service
            的所有类进行了重命名，替换成为了具有清晰语义的类名，充分表明了该请求或处理方法所对应的行为。这样，后端的代码就先天具有了十分明晰的语义，相当于变相省去了大量不必要的注释。其次，对于所有的
            Request 和 Service 根据整个系统的功能模块建立了平行的包结构，对应包下的 Controller 调用对应包下的 Service 服务对应包下的
            Request。这样在前端查询后端是哪一块代码处理了请求时能够十分快速地定位到相应的代码。同时将一些具有公用属性的 Request 和 Service 提取出来，形成有效复用。<img
              src="lab4/package.png"
              alt="package"
            />
          </li>

          <li>
            防御式编程：后端对于请求的合法性做了非常严格的检查，既是前端已经通过 JS
            限制了请求的发送格式，但是并不意味着恶意用户不能够绕过前端的检查向后端发送请求，因此对于请求的合法性检查是十分必要的。诸如在会议评审时需要验证请求者的 PCMember
            身份，作者修改 Paper 时需要验证请求者的 Author 身份。既是前端对于请求内容格式做了检查，后端同样要进行验证。这一点在修改稿件上体现的十分明显。<img
              src="lab4/modifyPaper.png"
              alt="modifyPaper"
            />
          </li>
        </ul>
      </li>
      <li>
        LAB4 新需求
        <ul>
          <li>
            新需求的主要难点在于对 Conference, PCMember, Topic , Paper
            几个东西相互关系的处理，以及稿件分配策略实现上。其中，前者的设计直接影响了后者的实现难度。对于它们的相互关系，经过充分讨论，我们增加了一个 Entity, Review 类。一个
            Review 对象对应一个 PC Member, 包含了这个 PC Member 所在的会议，负责的
            Topic，需要审核的稿件集合。非常精简的反映了审稿的对应关系，也简化了在开启分配时对于数据库的操作量。
          </li>
          <li>由于测试需要，引入了 Generator 对 Entity 进行随机化生成，大大方便了 JUnit 测试和前后端对接时的测试。</li>
          <li>
            不足之处：后端依旧存在不足之处。① 大量所谓公用方法直接塞进了 UtilityService
            中，但其实内部的静态方法所处理的职责五花八门，有些甚至不怎么通用。因此应该对这个类进行重新评估，进行合理的拆分。②
            代码内部的质量有待提高，代码重复率有待地下降，性能还有提升空间
          </li>
        </ul>
      </li>
      <li>
        华为云代码检查
        <ul>
          <li>
            华为云的代码检查功能是十分强大的，能够检测出很多在写代码中注意不到的代码质量问题，或者由于惰性，或者还对所写代码熟悉导致的不愿修改的烂代码。这样强行逼迫作者对于这种有质量问题的代码进行处理，能够有效提升代码内部质量和长期可维护性。
          </li>
        </ul>
      </li>
    </ul>
    <h3>颜华</h3>
    <p>这次我负责编写后端的 JUnit 单元测试</p>
    <ul>
      <li>
        测试驱动开发（TTD）：单元测试是用来对一个模块、一个函数或者一个类来进行正确性检验的测试工作。如果单元测试通过，说明我们测试的这个函数能够正常工作。如果单元测试不通过，要么函数有
        bug，要么测试条件输入不正确，总之，需要修复使单元测试能够通过。单元测试的意义在于如果我们对代码做了修改，只需要再跑一遍单元测试，如果通过，说明我们的修改不会对原有的行为造成影响，如果测试不通过，说明我们的修改与原有行为不一致，要么修改代码，要么修改测试。这种以测试为驱动的开发模式最大的好处就是确保一个程序模块的行为符合我们设计的测试用例。在将来修改的时候，可以极大程度地保证该模块行为仍然是正确的。
      </li>
      <li>SpringBoot + JUnit：测试的方法主要是通过手动拼接 HttpRequest 来模拟客户端请求资源，测试时需要充分考虑各种可能的情况。 需要注意的是 SpringBoot 的注入机制和一些注解。</li>
      <li>
        总结：本次体会到了测试驱动开发的好处：
        <ol>
          <li>当写完一个函数后可以立马检测是否正确，不需要等到最后慢慢发现，而且有些 bug 在后面的测试中可能并不容易发现。</li>
          <li>
            在跑测试的过程中可以发现很多 bug 并且精确定位，具体到某一行出现的问题，而且覆盖面广。本次项目中的很多 bug 都是在测试的时候发现的，前后端对接时的 bug 相比上次 lab
            少了很多。
          </li>
          <li>在版本的迭代过程中可能需要修改某些方法，为了保证新的方法不影响原来的行为，我们只需要跑一遍单元测试就行了 。</li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Lab3',
};
</script>

<style scoped>
#lab {
  padding: 4%;
  text-align: left;
}

#lab img {
  width: 80%;
  margin: 10%;
}

#lab h1::before {
  content: '👌 ';
}

#lab h2::before {
  content: '👉 ';
}

#lab h3::before {
  content: '👍 ';
}

#lab h4::before {
  content: '👏 ';
}
</style>
