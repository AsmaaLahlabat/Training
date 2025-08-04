<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t, locale } = useI18n()

function toggleLang() {
  locale.value = locale.value === 'en' ? 'ar' : 'en'
}

const username = computed(() => locale.value === 'ar' ? 'أسماء' : 'Asmaa')
const userInitials = computed(() => locale.value === 'ar' ? 'أس' : 'AL')

const columns = ['name', 'lastUpdate', 'status', 'odometer', 'licenseExp']
</script>

<template>
  <header :dir="locale === 'ar' ? 'rtl' : 'ltr'" class="bg-light border-bottom py-3 px-4 w-100">
    <!-- Top Header -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h6 class="fw-bold m-0">{{ t('units') }}</h6>

      <div class="d-flex align-items-center gap-3">
        <i class="bi bi-bell text-secondary fs-5" style="cursor: pointer;"></i>

        <!-- Language -->
        <div class="dropdown">
          <button class="btn p-0 border-0 bg-transparent" data-bs-toggle="dropdown" title="Language">
            <i class="bi bi-globe text-secondary fs-5"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow-sm">
            <li><a class="dropdown-item" href="#" @click.prevent="locale = 'en'">{{ t('english') }}</a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="locale = 'ar'">{{ t('arabic') }}</a></li>
          </ul>
        </div>

        <!-- Profile -->
        <div class="dropdown">
          <button class="btn d-flex align-items-center gap-2 bg-transparent border-0 p-0 dropdown-toggle" data-bs-toggle="dropdown">
            <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold"
              style="width:32px; height:32px; background-color:#6c757d; color:white;">
              {{ userInitials }}
            </div>
            <span class="text-dark">{{ username }}</span>
          </button>
          <div class="dropdown-menu dropdown-menu-end p-3 shadow" style="width: 220px; border-radius: 12px;">
            <div class="text-center mb-3">
              <div class="rounded-circle mx-auto d-flex align-items-center justify-content-center fw-bold"
                style="width:50px; height:50px; background-color:#6c757d; color:white; font-size: 20px;">
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
    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
      <div class="d-flex flex-wrap align-items-center gap-2">
        <!-- Search -->
        <div class="input-group input-group-sm" style="width: 200px;">
          <span class="input-group-text bg-white"><i class="bi bi-search"></i></span>
          <input type="text" class="form-control" :placeholder="t('search')" />
        </div>

        <!-- Filter -->
        <select class="form-select custom-select-style" style="width: 200px;">
          <option selected>{{ t('all') }}</option>
          <option>{{ t('licenseExpired') }}</option>
          <option>{{ t('licenseNotExpired') }}</option>
          <option>{{ t('withTracking') }}</option>
        </select>

        <!-- Tags -->
        <select class="form-select form-select-sm text-secondary" style="width: 200px;">
          <option selected disabled hidden>{{ t('tags') }}</option>
          <option>Test 1</option>
          <option>Test 2</option>
          <option>Test 3</option>
          <option>Test 4</option>
        </select>

        <!-- Export -->
        <div class="dropdown">
          <button class="btn btn-outline-secondary" type="button" data-bs-toggle="dropdown">
            {{ t('export') }}
          </button>
          <ul class="dropdown-menu shadow">
            <li>
              <a class="dropdown-item d-flex align-items-center gap-2" href="#">
                <i class="bi bi-file-earmark-pdf-fill text-danger"></i>
                {{ t('exportPdf') }}
              </a>
            </li>
            <li>
              <a class="dropdown-item d-flex align-items-center gap-2" href="#">
                <i class="bi bi-file-earmark-excel-fill text-success"></i>
                {{ t('exportExcel') }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Refresh -->
        <button class="btn btn-sm btn-outline-secondary">
          <i class="bi bi-arrow-repeat"></i> {{ t('refresh') }}
        </button>
      </div>

      <!-- Settings Icon -->
      <div class="dropdown">
        <button class="btn btn-outline-secondary p-2" type="button" data-bs-toggle="dropdown">
          <i class="bi bi-gear"></i> {{ t('settings') }}
        </button>
        <div class="dropdown-menu dropdown-menu-end p-3 shadow"
          style="min-width: 220px; max-height: 300px; overflow-y: auto; border-radius: 12px;">
          <h6 class="dropdown-header fw-semibold border-bottom pb-2">{{ t('chooseColumns') }}</h6>
          <div class="form-check mt-2" v-for="(col, index) in columns" :key="index">
            <input class="form-check-input" type="checkbox" :id="'col' + index" checked>
            <label class="form-check-label fw-semibold" :for="'col' + index">{{ t(col) }}</label>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
