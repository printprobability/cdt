<template>
  <v-container>
    <div class="mt-5">
      <h3>ABOUT</h3>
      <br/>
      <h5>Why damaged & distinctive types?</h5>
      <br/>
      <p>Recent estimates suggest that the printers of more than half of all books, pamphlets, and broadsides printed in Restoration London remain unknown. The CDT is a resource to help identify unknown printers. “Type,” Harry Carter once remarked, “is something you can pick up and hold in your hand.” Made of a pliant lead alloy, letterpress letters were often damaged during presswork, broken or bent by the heavy action of the press or spoiled by debris. Printers kept these disfigured letters in use while damages and idiosyncrasies accrued, providing a useful signal for contemporary scholars. Since no two pieces of type will degrade in precisely the same way, damaged and distinctive type offers a kind of typographical fingerprint that can reveal the identities of the individuals(s) responsible for a book’s making.</p>
      <br/>

      <h5>(Known) Limitations in CDT Data</h5>
      <br/>
      <p>While the CDT is a first-of-its-kind resource for the analysis of distinctive and damaged types at scale, it is not comprehensive for its period of coverage (1660-1700). Damaged type data for many printers remains limited for a variety of reasons. In many cases, a printer’s output survives only through a handful of editions, some of which may survive in only a few copies, few or none of which have been digitized. Moreover, many printers undoubtedly owned more fonts than appear here. What’s included in CDT in most cases simply reflects what’s been digitized and is publicly available. The CDT is also limited to uppercase, non-ligature characters. Extending beyond that set would impair our intention to create a tractable and searchable body of evidence.</p>
      <br/>
      <p>Still, the CDT represents a carefully curated set of more than 15,000 characters extracted from digital copies of more than 1900 editions printed between 1660 and 1700.</p>
      <br/>

      <h5>A Note on Printers</h5>
      <br/>
      <p>Some Restoration printers worked exclusively in collaboration with a second printer. The respective types of these printers — if they had separate type cases at all — are impossible to reliably assign or differentiate. In these cases, the names of both collaborators are given as a single entry in the CDT. An index of printers included in the CDT is linked <NuxtLink target="_blank" :to="{ name: 'printers' }" aria-label="To printers">here</NuxtLink>.</p>
      <br/>

      <h5>Print &amp; Probability</h5>
      <br/>
      <p>The type impressions gathered on the CDT were identified using machine learning and computer vision tools developed by the <a target="_blank" aria-label="Print & Probability project" href="https://printprobability.org/">Print & Probability</a> project — an interdisciplinary team of literary historians, bibliographers, librarians, and computer scientists at Carnegie Mellon University and the University of California, San Diego.</p>
      <br/>
      <p class="pl-10">To learn more about the Print & Probability project and our methods — what we call “computational bibliography” — see our <a target="_blank" aria-label="2021 lecture at the Grolier Club" href="https://vimeo.com/792949634">2021 lecture at the Grolier Club</a> or the list of publications available at <a target="_blank" aria-label="Print & Probability project" href="https://printprobability.org/">https://printprobability.org/</a>.</p>
      <br/>

      <h5>The CDT Team</h5>
      <br/>
      <strong>Editor</strong>
      <p>Christopher N. Warren, Carnegie Mellon University, Department of English</p>
      <br/>
      <strong>Editorial & Technical Team</strong>
      <p>Taylor Berg-Kirkpatrick, UC San Diego, Computer Science & Engineering</p>
      <p>Laura DeLuca, Carnegie Mellon University, Department of English</p>
      <p>Baron Glanvill, Carnegie Mellon University, Department of English</p>
      <p>Kartik Goyal, Georgia Tech, College of Computing</p>
      <p>John Ladd, Washington & Jefferson College</p>
      <p>Sam Lemley, Carnegie Mellon University Libraries</p>
      <p>DJ Schuldt, Burke Library, Hamilton College</p>
      <p>Kari Thomas, Carnegie Mellon University, Department of History</p>
      <p>Nikolai Vogler, UC San Diego, Computer Science & Engineering</p>
      <br/>
      <strong>Editorial & Technical Team</strong>
      <p>Jonathan Kiritharan, Carnegie Mellon University Libraries</p>
      <p>Sam Lemley, Carnegie Mellon University Libraries</p>
      <p>Talia Perry, Carnegie Mellon University Libraries</p>
      <br/>
      <strong>Frontend design</strong>
      <p>@Henry Ph.</p>
      <p>Jonathan Armoza (edited)</p>
      <br/>
      <p>The CDT gratefully acknowledges support from the National Endowment for the Humanities.</p>
      <br/>

      <img alt="Logo" :src="image" style="height: 50px"/>
    </div>
  </v-container>
</template>

<script setup>
import image from '~/public/img/pnp_logo.png'
</script>
