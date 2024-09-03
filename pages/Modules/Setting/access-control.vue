<template>
<div id="layoutSidenav">
    <CommonSidebar />
    <div id="layoutSidenav_content">
        <CommonHeader />
        <main>
            <div class="container-fluid px-4">
                <div class="page-title">
                    <h1>System Setting</h1>
                </div>
                <div class="row">
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade no-border show active" id="nav-profile" role="tabpanel">
                            <!-- 01-tab -->
                            <Screenmanagement />
                        </div>
                        
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>
</template>

<script>
import CommonHeader from '../../../components/CommonHeader.vue';
import CommonSidebar from '../../../components/CommonSidebar.vue';
import Screenmanagement from "../../../components/Admin/screenmanagement.vue";
export default {
    components: {
        CommonHeader,
        CommonSidebar,
        Screenmanagement,
    },
    name: "access-control",
};
</script>
