<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item border-top-0 border-left-0 border-right-0 bg-transparent pb-3">
        <div class="row align-items-center">
          <div class="col-3">
            <div class="d-flex flex-row align-items-center">
              <p class="mb-0 list-text">
                <strong>Nama<br></strong>
              </p><span class="ms-auto" />
            </div>
          </div>
          <div class="col">
            <p class="mb-0 list-text">
              <strong>Grup<br></strong>
            </p>
          </div>
          <div class="col text-center">
            <p class="mb-0 list-text">
              <strong>Varian<br></strong>
            </p>
          </div>
          <div class="col text-center">
            <p class="mb-0 list-text">
              <strong>Addons<br></strong>
            </p>
          </div>
          <div class="col text-center">
            <p class="mb-0 list-text">
              <strong>Status<br></strong>
            </p>
          </div>
          <div class="col text-right">
            <p class="mb-0 list-text">
              <strong>Harga</strong>
            </p>
          </div>
          <div class="col-auto">
            <p class="mb-0 list-text text-transparent">
              <strong>Action</strong>
            </p>
          </div>
        </div>
      </li>

      <template v-if="datas.length">
        <li v-for="(data, i) in datas" :key="i" class="list-group-item">
          <div class="row align-items-center">
            <div class="col-3">
              <div class="row mx-0 align-items-center">
                <div class="col-5">
                  <img class="img-fluid" src="https://www.malangculinary.com/upload/img_15944486022.jpg">
                </div>
                <div class="col">
                  <p class="mb-0 list-text">
                    {{ catalog.name }}
                  </p>
                  <p class="text-secondary mb-0 list-text minititle">
                    {{ catalog.code }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <p class="mb-0 list-text">
                {{ catalog.group }}
              </p>
            </div>
            <div class="col text-center">
              <b-button v-if="catalog.varians.length" variant="link">
                {{ catalog.varians.length }}
              </b-button>
              <p v-else class="mb-0 list-text">
                {{ catalog.varians.length }}
              </p>
            </div>
            <div class="col text-center">
              <b-button v-if="catalog.addons.length" variant="link">
                {{ catalog.addons.length }}
              </b-button>
              <p v-else class="mb-0 list-text">
                {{ catalog.addons.length }}
              </p>
            </div>
            <div class="col text-center">
              <p class="text-success mb-0 list-text">
                {{ catalog.status }}
              </p>
            </div>
            <div class="col text-right">
              <p class="text-end mb-0 list-text">
                {{ catalog.price | number }}
              </p>
            </div>
            <div class="col-auto text-right">
              <b-dropdown variant="link" size="small" toggle-class="text-decoration-none" no-caret right>
                <template #button-content>
                  <b-icon-three-dots-vertical />
                </template>
                <b-dropdown-item href="#">
                  Lihat Produk
                </b-dropdown-item>
                <b-dropdown-item href="#">
                  Ubah Produk
                </b-dropdown-item>
                <b-dropdown-item href="#">
                  Ubah Harga
                </b-dropdown-item>
                <b-dropdown-item href="#">
                  Nonaktifkan Produk
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </li>
      </template>
      <template v-else>
        <li class="list-group-item">
          <div class="row">
            <div class="col text-center">
              <p class="mb-0">
                Tidak ada data
              </p>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      datas: []
    }
  }
}
</script>
