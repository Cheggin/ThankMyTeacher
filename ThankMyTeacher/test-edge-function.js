const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://jtegelvgqknsbyxkhoqy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0ZWdlbHZncWtuYnNieXhraG9xeSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM3NzQ5NzE5LCJleHAiOjIwNTMzMjU3MTl9.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testEdgeFunction() {
  try {
    const { data, error } = await supabase.functions.invoke('send-thank-you', {
      body: {
        to: 'reaganhsu123@gmail.com',
        subject: 'Test Thank You Email',
        message: '<h1>Test Thank You</h1><p>This is a test email from ThankMyTeacher app.</p>'
      }
    })

    if (error) {
      console.error('Error:', error)
    } else {
      console.log('Success:', data)
    }
  } catch (err) {
    console.error('Exception:', err)
  }
}

testEdgeFunction() 