<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t, locale } = useI18n()

const username = computed(() => (locale.value === 'ar' ? 'أسماء' : 'Asmaa'))
const userInitials = computed(() => (locale.value === 'ar' ? 'أس' : 'AL'))

const columns = ['name', 'lastUpdate', 'status', 'odometer', 'licenseExp']

function changeLang(lang) {
  locale.value = lang
}
</script>

<template>
  <header
    :dir="locale === 'ar' ? 'rtl' : 'ltr'"
    class="units-header py-3 px-0 w-100"
  >
    <!-- العنوان + الخط تحته -->
    <div class="d-flex justify-content-between align-items-center mb-3 px-4 border-bottom pb-2">
      <h5 class="fw-bold m-0">{{ t('Units') }}</h5>

      <div class="d-flex align-items-center gap-3">
        <!-- Bell Icon -->
        <div class="btn bg-light p-2 rounded-circle">
          <i class="bi bi-bell"></i>
        </div>

        <!-- Language Dropdown -->
        <div class="dropdown">
          <button
            class="btn bg-light p-2 rounded-circle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-globe"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow-sm">
            <li>
              <button class="dropdown-item" @click="changeLang('en')">English</button>
            </li>
            <li>
              <button class="dropdown-item" @click="changeLang('ar')">العربية</button>
            </li>
          </ul>
        </div>

        <!-- Profile -->
        <div class="dropdown">
          <button
            class="btn d-flex align-items-center gap-2 bg-transparent border-0 p-0 dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <div
              class="rounded-circle d-flex align-items-center justify-content-center fw-bold"
              style="width:32px; height:32px; background-color:#6c757d; color:white;"
            >
              {{ userInitials }}
            </div>
            <span class="text-dark">{{ username }}</span>
          </button>
          <div class="dropdown-menu dropdown-menu-end p-3 shadow" style="width: 220px; border-radius: 12px;">
            <div class="text-center mb-3">
              <div
                class="rounded-circle mx-auto d-flex align-items-center justify-content-center fw-bold"
                style="width:50px; height:50px; background-color:#6c757d; color:white; font-size: 20px;"
              >
                {{ userInitials }}
              </div>
              <div class="fw-bold mt-2">{{ username }}</div>
              <div class="text-muted small">PITS</div>
            </div>
            <button class="btn btn-outline-secondary btn-sm w-100 mb-2">{{ t('editProfile') }}</button>
            <a href="#" class="dropdown-item text-center small text-muted py-1 border-top">{{ t('switchAccounts') }}</a>
            <a href="#" class="dropdown-item text-center fw-semibold py-2 border-top">{{ t('logOut') }}</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters & Settings Row -->
    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 px-4">
      <div class="d-flex flex-wrap align-items-center gap-2">
        <!-- Search -->
        <div class="input-group input-group-sm" style="width: 200px;">
          <span class="input-group-text bg-white"><i class="bi bi-search"></i></span>
          <input type="text" class="form-control" :placeholder="t('Search')" />
        </div>

        <!-- Filter -->
        <select class="form-select custom-select-style" style="width: 200px;">
          <option selected>{{ t('All') }}</option>
          <option>{{ t('licenseExpired') }}</option>
          <option>{{ t('licenseNotExpired') }}</option>
          <option>{{ t('withTracking') }}</option>
        </select>

        <!-- Tags -->
        <select class="form-select form-select-sm text-secondary" style="width: 200px;">
          <option selected disabled hidden>{{ t('Tags') }}</option>
          <option>Test 1</option>
          <option>Test 2</option>
          <option>Test 3</option>
          <option>Test 4</option>
        </select>

        <!-- Export -->
        <div class="dropdown">
          <button class="btn btn-outline-secondary bg-white" type="button" data-bs-toggle="dropdown">
            {{ t('Export') }}
          </button>
          <ul class="dropdown-menu shadow">
            <li>
              <a class="dropdown-item d-flex align-items-center gap-2" href="#">
                <i class="bi bi-file-earmark-pdf-fill text-danger"></i>
                {{ t('ExportPdf') }}
              </a>
            </li>
            <li>
              <a class="dropdown-item d-flex align-items-center gap-2" href="#">
                <i class="bi bi-file-earmark-excel-fill text-success"></i>
                {{ t('ExportExcel') }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Refresh -->
        <button class="btn btn-sm btn-outline-secondary bg-white">
          <i class="bi bi-arrow-repeat"></i>
        </button>

        <!-- مسافة بين الريفرش والإعدادات -->
        <div style="width: 630px;"></div>

        <!-- Settings Icon -->
        <div class="dropdown">
          <button class="btn btn-outline-secondary p-2 bg-white" type="button" data-bs-toggle="dropdown">
            <i class="bi bi-gear"></i>
          </button>
          <div
            class="dropdown-menu dropdown-menu-end p-3 shadow"
            style="min-width: 220px; max-height: 300px; overflow-y: auto; border-radius: 12px;"
          >
            <h6 class="dropdown-header fw-semibold border-bottom pb-2">{{ t('chooseColumns') }}</h6>
            <div class="form-check mt-2" v-for="(col, index) in columns" :key="index">
              <input class="form-check-input" type="checkbox" :id="'col' + index" checked>
              <label class="form-check-label fw-semibold" :for="'col' + index">{{ t(col) }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.units-header {
  margin-inline: 0 !important;
  max-width: none !important;
  width: 100% !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  background-color: transparent !important;
  box-shadow: none !important;
}

.btn-outline-secondary.bg-white:hover,
.btn-outline-secondary.bg-white:focus {
  background-color: white !important;
  color: inherit !important;
  border-color: #6c757d !important;
}

/* للخلفية الرمادية للأزرار الدائرية */
.btn.bg-light {
  background-color: #e2e6ea !important;
  color: #212529 !important;
}
</style>
