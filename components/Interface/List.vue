<template>
  <v-container>
    <div class="d-flex">
      <p v-if="props.title" class="page-title">{{ props.title }}</p>
      <v-spacer/>
      <slot name="left"></slot>
    </div>

    <slot name="intro"></slot>

    <v-row class="mt-5">
      <v-col cols="12" md="3">
        <p class="page-header">Search the Catalog</p>
        <v-form>
          <slot name="filter"></slot>
        </v-form>
        <div v-if="$vuetify.display.mdAndUp" style="height: calc(15vh - 20px)"/>
        <div class="mt-5">
          <h3>ABOUT</h3>
          <br/>
          <h5>Why damaged & distinctive types? </h5>
          <br/>
          <p>Recent estimates suggest the printers of more than half of all books, pamphlets, and broadsides printed in Restoration London remain unknown. The CDT is a resource to help identify unknown printers. “Type,” Harry Carter once remarked, “is something you can pick up and hold in your hand.” Made of a pliant lead alloy, letterpress letters were often damaged during presswork, broken or bent by the heavy action of the press or spoiled by debris. Printers kept these disfigured letters in use while damages and idiosyncrasies accrued, providing a useful signal for contemporary scholars. Since no two pieces of type will degrade in precisely the same way, damaged and distinctive type offers a kind of typographical fingerprint that can reveal the identities of the individuals(s) responsible for a book’s making.</p>
          <br/>

          <h5>Print &amp; Probability</h5>
          <br/>
          <p>The type impressions gathered on the CDT were identified  using machine learning and computer vision tools developed by the <a aria-label="Print & Probability" href="https://printprobability.org/">Print & Probability</a> project — an interdisciplinary team of literary historians, bibliographers, librarians, and computer scientists at Carnegie Mellon University and the University of California, San Diego.</p>
          <br/>
          <p class="pl-10">To learn more about the Print & Probability project and our methods — what we call “computational bibliography” — see our <a aria-label="2021 lecture at the Grolier Club" href="https://vimeo.com/792949634">2021 lecture at the Grolier Club</a> or the list of publications available at <a aria-label="Print & Probability" href="https://printprobability.org/">https://printprobability.org/</a>.</p>
          <br/>

          <h5>(Known) Limitations in CDT Data</h5>
          <br/>
          <p>While the CDT is a first-of-its-kind resource for the analysis of distinctive and damaged types, it is not comprehensive for its period of coverage (1660-1700). Damaged type data for many printers remains limited for a variety of reasons. In many cases, a printer’s output survives only through a handful of editions, some of which may survive in only a few copies, few or none of which have been digitized. Moreover, many printers undoubtedly owned more fonts than appear here. What’s included in CDT in most cases simply reflects what’s been digitized and is publicly available. Finally, the CDT is limited to uppercase, non-ligature characters. Extending beyond that set would impair our intention to create a tractable and searchable body of evidence.</p>
          <br/>
          <p>Still, the CDT represents a carefully curated set of more than 15,000 characters extracted from digital copies of more than 1900 editions printed between 1660 and 1700.</p>
          <br/>

          <img alt="Logo" src="/img/pnp_logo.png" style="height: 50px"/>
        </div>
      </v-col>

      <v-col cols="12" md="9">
        <p v-if="empty" class="page-header">No results</p>

        <slot name="results"></slot>
      </v-col>
    </v-row>

    <slot name="foot"></slot>
  </v-container>
</template>

<script setup>
const props = defineProps({
  title: String,
  empty: Boolean,
});
</script>

<style>
.page-header {
  font-size: 1em;
  font-weight: 600;
  //color: #b00;
}

.page-title {
  font-size: 2.5em;
  font-weight: 500;
  //color: #b00;
}
</style>
