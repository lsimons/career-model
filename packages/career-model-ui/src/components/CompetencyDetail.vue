<template>
  <div id="competency-detail" style="width: 100%; height: 100%">
    <v-container>
      <v-row class="flex-grow-1" dense>
        <div>
          <span v-html="detail"></span>
        </div>
      </v-row>
      <v-row class="flex-grow-1" dense>
        <div class="competency-definition">
          <p>TODO: load competency details dynamically.<br>{{ definition }}</p>
        </div>
      </v-row>
      <v-row v-if="expand" class="flex-grow-1" dense>
        <v-col v-if="books.length > 0" cols="12" md="6" xl="4">
          <div class="competency-books">
            <h2 class="text-h6">Books:</h2>
            <ul>
              <li v-for="book in books" :key="book.isbn"><a v-bind:data-isbn-13="book.isbn" v-bind:href="book.href">{{ book.title }}</a></li>
            </ul>
          </div>
        </v-col>
        <v-col v-if="courses.length > 0" cols="12" md="6" xl="4">
          <div class="competency-courses">
            <h2 class="text-h6">Online courses:</h2>
            <ul>
              <li><a href="https://construx.vueocity.com/portal/code-complete-essentials">Code Complete Essentials</a> (paid, 7h40m)</li>
              <li><a href="https://www.youtube.com/playlist?list=PLr5kTqIf6cOHXY18-bOxMWRTAiUVd1NQN">Clean Code Playlist</a> (free, 9h11m)</li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row class="flex-grow-1" dense>
        <v-col cols="12" md="6" lg="4">
          <div class="competency-behavior-base">
            <h2 class="text-h6">Base level behavior</h2>
            <ul>
              <li>produce detailed design for high-level design and architecture</li>
              <li>write programs from scratch satisfying requirements and detailed design</li>
              <li>use a programming language following its best practices</li>
              <li>use appropriate editors and IDEs for coding</li>
              <li>define and apply coding standards</li>
              <li>write code that is simple, understandable and maintainable</li>
            </ul>
          </div>
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <div class="competency-behavior-expert">
            <h2 class="text-h6">Expert level behavior</h2>
            <ul>
              <li>write code that is considered beautiful by peers</li>
              <li>write high quality code on schedule that implements only its requirements</li>
              <li>master best practice tools and IDEs for maximum productivity</li>
              <li>guide peers to write better source code</li>
              <li>teach coding practices to others</li>
              <li>write code that is ready for change</li>
              <li>write code that is easy to verify for correctness</li>
            </ul>
          </div>
        </v-col>
        <v-col cols="12" md="12" lg="4">
          <div class="competency-behavior-leadership">
            <h2 class="text-h6">Leadership level behavior</h2>
            <ul>
              <li>give industry training on coding best practices</li>
              <li>produce articles, books or other media on coding best practices</li>
              <li>improve company-wide coding standards and practices</li>
              <li>help multiple teams improve coding practices</li>
              <li>innovate on industry coding practices and share outcomes</li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="expand" class="flex-grow-1" dense>
        <v-col cols="12" md="6" xl="4">
          <div class="competency-prerequisites">
            <h2 class="text-h6">Prerequisites</h2>
            <ul>
              <li><competency-link category="General" area="Foundations" competency="Reading" expand/></li>
              <li><competency-link category="General" area="Foundations" competency="Writing" expand/></li>
              <li><competency-link category="General" area="Foundations" competency="Teamwork" expand/></li>
              <li><competency-link category="General" area="Foundations" competency="Deliberate Practice" expand/></li>
            </ul>
          </div>
        </v-col>
        <v-col cols="12" md="6" xl="4">
          <div class="competency-related">
            <h2 class="text-h6">Related:</h2>
            <ul>
              <li><competency-link category="Software Technology" area="Languages" expand/></li>
              <li><competency-link category="Software Technology" area="IDEs" expand/></li>
              <li><competency-link category="Software Technology" area="Editors" expand/></li>
              <li><competency-link category="Software Technology" area="Version Control" expand/></li>
              <li><competency-link category="Software Production" area="Construction" competency="Debugging" expand/></li>
              <li><competency-link category="Software Production" area="Construction" competency="Refactoring" expand/></li>
              <li><competency-link category="Software Production" area="Test" competency="Unit Test" expand/></li>
              <li><competency-link category="Software Management" area="Quality" competency="Pairing" expand/></li>
              <li><competency-link category="Software Management" area="Review" competency="Code Review" expand/></li>
            </ul>
          </div>
        </v-col>
        <v-col cols="12" md="12" xl="4">
          <div class="competency-prerequisites">
            <h2 class="text-h6">Specializations</h2>
            <ul>
              <li><competency-link category="Software Production" area="Construction" competency="Secure Coding" expand/></li>
            </ul>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="expand" class="flex-grow-1" dense>
        <div class="competency-guide">
          <h2 class="text-h6">Learning path</h2>
          <p>
            Coding is a deep skill improved almost entirely through experience and deliberate practice. Only the most
            basic competency can be established with some training and practice in classroom or workshop settings such
            as in an academic environment or at a code school. Once you have a basic proficiency you can self-improve
            through specific exercises such as <a href="http://codekata.com/">Code kata</a>. Over the course of your
            career 95% or more of your learning to code will be on the job.
          </p>
          <p>
            A particularly useful deliberate practice for improving coding skill is
            <competency-link category="Software Management" area="Quality" competency="Pairing"/> with other coders
            and taking some extra time during or around pairing sessions to exchange tips and advice. Most great coders
            report to have learned a lot of great practices by pairing, both in settings where they were junior to their
            partner and where they were more senior. It is worthwhile to pair with a wide range of other coders, also
            outside of your regular environment.
          </p>
          <p>
            To progress beyond a basic level of competency requires to also achieve basic competency in the related
            areas listed above. In particular you need to be good enough at using your development environment
            (programming language, version control system, editor or IDE) that they do not get in the way of your coding
            progress.
          </p>

          <h2 class="text-h6">Competency evaluation</h2>
          <p>
            When paired with a lot of other competencies in the right context, a high competency in coding will allow
            you to consistently produce high quality code with a low level of technical debt. This means you can
            somewhat measure your level of expertise by the quality of the software produce. Because coding is
            mostly a team activity, it is difficult to isolate individual competency vs team competency. You can get
            some sense of your ability vs that of your team by working in different teams.
          </p>
          <p>
            Programming exercises or puzzles can be used to assess a quite basic competency only, though they tend to
            overvalue knowledge of programming languages and knowledge of algorithms over actual coding ability. Coding
            competitions measure some amount of coding competency, though due to their setup they overvalue speed of
            coding over more important attributes like understandability and maintainability of code.
          </p>
          <p>
            Beyond the most basic competency, most evaluation of your skill should be done through feedback from peers.
            The most important feedback is the spontaneous feedback on-the-job when expert coders are impressed by your
            coding. If you can no longer find peers that can help you self-evaluate, if you are or become a trainer
            or public speaker, giving trainings and presentations that include live coding can be a way to get some
            feedback from a wide range of other coders.
          </p>
          <p>
            Leadership in coding is much like zen mastery: beyond a certain level, the key to further self improvement
            is to teach others.
          </p>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { loadCompetency } from '../store/competencies'
import CompetencyLink from './CompetencyLink'

export default {
  name: 'CompetencyDetail',
  props: {
    category: String,
    area: String,
    competency: String,
    expand: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function () {
    return {
      definition: 'Coding is creating software by writing source code.',
      books: [
        {
          isbn: '978-0735619678',
          href: 'https://www.amazon.com/Code-Complete-Practical-Handbook-Construction/dp/0735619670',
          title: 'Code complete'
        },
        {
          isbn: '978-0132350884',
          href: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship-dp-0132350882/dp/0132350882/',
          title: 'Clean Code'
        },
        {
          isbn: '978-0596510046',
          href: 'https://www.amazon.com/Beautiful-Code-Leading-Programmers-Practice/dp/0596510047',
          title: 'Beautiful Code'
        }
      ],
      courses: []
    }
  },
  methods: {
    redrawCompetency (competencyDetail) {
      console.log('competencyDetail', competencyDetail)
      // this.detail = '<p>No detail available</p>'
      this.detail = ''
    }
  },
  mounted () {
    const comp = this
    loadCompetency(this.category, this.area, this.competency, function (competencyDetail) {
      comp.redrawCompetency(competencyDetail)
    })
  },
  components: {
    CompetencyLink
  }
}
</script>

<style scoped>
  .competency-definition {
    font-weight: bold;
  }
</style>
