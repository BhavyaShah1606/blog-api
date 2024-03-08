

const blogContent = `
    <p>
        <h4>Design Systems for Developers Geeks a modern, clean and accessibility oriented design system for developing fast and powerful web interfaces.</h4>
        <br>Condimentum leo utipsum euismod feugiatn elntum sapiennonser variusmi elementum necunc elementum velitnon tortor convallis variusa placerat nequhse. 
        Mauris varius ullamcorper tincidsellus egestas innisivel sollicituullam feugiate facilisis ones Suspendisse blandit sedtincinean.<br>
        Mauris varius ullamcorper tincidsellus egestas innisivel sollicituullam feugiate facilisis ones velleo finibus maximus nequsese sedmattis auspendisse<u>duimetus ullamcorper faucibuse blandit</u>sedtincinean.
    </p>
    <br>
    <hr>
    <br>
    <blockquote style="text-align: center;">
        <h2 style="color: rgb(117, 79, 254);">"Failure will never overtake me if my determination to succeed is strong enough."</h2>
        <footer>
            <cite title="Source Title">Og Mandino</cite>
        </footer>
    </blockquote>
    <br>
    <hr>
    <br>
    <div>
        <p>Condimentum leo utipsum euismod feugiatn elntum 
            <strong>sapiennonser variusmi elementum </strong>necunc elem entum velitnon tortor convallis variusa placerat nequhse. Quis eu Lorem irure magna. 
            Ex labore reprehenderit veniam irure id nostrud velit. Minim aliquip cillum laborum qui Lorem eu.</p>
        <p>Sint officia nulla deserunt voluptate non amet consequat ipsum tempor. Nulla id cupidatat ipsum occaecat. Aute ad et fugiat velit sunt qui veniam labore elit ipsum commodo proident. 
            Sit tempor consectetur commodo laborum mollit. Enim sint nostrud nisi in ad aliqua laboris ad non.</p>
    </div>
    <div>
        <h3>Unordered Lists (Nested)</h3>
        <br>
        <ul>
            <li>Lorem ipsum dolor sit amet</li>
            <li>Consectetur adipiscing elit</li>
            <li>Integer molestie lorem at massa</li>
            <li>Facilisis in pretium nisl aliquet</li>
            <li>Nulla volutpat aliquam velit
                <ul>
                    <li>Phasellus iaculis neque</li>
                    <li>Purus sodales ultricies</li>
                    <li>Vestibulum laoreet porttitor sem</li>
                    <li>Ac tristique libero volutpat at</li>
                </ul>
            </li>
            <li>Faucibus porta lacus fringilla vel</li>
            <li>Aenean sit amet erat nunc</li>
            <li>Eget porttitor lorem</li>
        </ul>
    </div>
    <div>
        <h3>Ordered List (Nested)</h3>
        <ol>
            <li>Lorem ipsum dolor sit amet</li>
            <li>Consectetur adipiscing elit</li>
            <li>Integer molestie lorem at massa</li>
            <li>Facilisis in pretium nisl aliquet</li>
            <li>Nulla volutpat aliquam velit
                <ol>
                    <li>Phasellus iaculis neque</li>
                    <li>Purus sodales ultricies</li>
                    <li>Vestibulum laoreet porttitor sem</li>
                    <li>Ac tristique libero volutpat at</li>
                </ol>
            </li>
            <li>Faucibus porta lacus fringilla vel</li>
            <li>Aenean sit amet erat nunc</li>
            <li>Eget porttitor lorem</li>
        </ol>
    </div>
    <div>
        <h2>Image </h2>
        <p>Sint officia nulla deserunt voluptate non amet consequat ipsum tempor. Nulla id cupidatat ipsum occaecat. Aute ad et fugiat velit sunt qui veniam labore elit ipsum commodo proident. 
            Sit tempor consectetur commodo laborum mollit. Enim sint nostrud nisi in ad aliqua laboris ad non.</p>
        <img src="https://codescandy.com/geeks-bootstrap-5/assets/images/blog/center-img.jpg" alt=""  style="width:100%">
    </div>
`;

const BlogArticles = [

	{
		id: 1,
		category: 'Tutorial',
		title: 'Developing Agile Leadership',
		details:
			'Debitis ipsam ratione molestias dolores qui asperiores consequatur facilis error.',
		authorname: 'Jerry Dom',
		aboutauthor: 'Marketing Manager',
		postedon: 'September 13,2020',
		readinglength: 12,
		imageUrl: 'https://geeks-react.netlify.app/static/media/blogpost-2.bec7202197713425ceeb.jpg',
		content: blogContent
	},
	{
		id: 2,
		category: 'Courses',
		title: 'How to become modern Stack Developer in 2020',
		details:
			'Lorem ipsum dolor sit amet, accu msan in, tempor dictum nequrem ipsum',
		authorname: 'Reva Yokk',
		aboutauthor: 'Marketing Manager',
		postedon: 'September 05,2020',
		readinglength: 20,
		imageUrl: 'https://geeks-react.netlify.app/static/media/blogpost-1.b7812866b40bb29d8dfb.jpg',
		content: blogContent
	},
	{
		id: 3,
		category: 'Tutorial',
		title: 'What is PHP Function? For Beginner’s Guide',
		details:
			'Lorem ipsum dolor sit amet, accu msan in, tempor dictum nequrem ipsum',
		authorname: 'Lisa Menon',
		aboutauthor: 'Marketing Manager',
		postedon: 'September 06,2020',
		readinglength: 8,
		imageUrl: 'https://geeks-react.netlify.app/static/media/blogpost-4.87cc7f1eee9a1502f19e.jpg',
		content: blogContent
	},
	{
		id: 4,
		category: 'Workshop',
		title: 'What is Cyber Security? A Beginner’s Guide',
		details:
			'Lorem ipsum dolor sit amet, accu msan in, tempor dictum nequrem ipsum',
		authorname: 'Maria Pinto',
		aboutauthor: 'Marketing Manager',
		postedon: 'September 07,2020',
		readinglength: 15,
		imageUrl: 'https://geeks-react.netlify.app/static/media/blogpost-5.2fafe88ffd24705261bf.jpg',
		content: blogContent
	},
	{
		id: 5,
		category: 'Tutorial',
		title: 'What is machine learning and how does it work?',
		details:
			'Lorem ipsum dolor sit amet, accu msan in, tempor dictum nequrem ipsum',
		authorname: 'Loran Sipon',
		aboutauthor: 'Marketing Manager',
		postedon: 'September 08,2020',
		readinglength: 10,
		imageUrl: 'https://geeks-react.netlify.app/static/media/blogpost-3.08def44b3b2603bd3985.jpg',
		content: blogContent
	},
	{
		id: 6,
		category: 'Workshop',
		title: 'The Best DevOps Tools for Your Application Lifecycle',
		details:
			'Inventore pariatur veritatis maxime fugiat sint dolorem quas culpa officiis nemo quis!',
		authorname: 'Dustin Warren',
		aboutauthor: 'Marketing Manager',
		postedon: 'September 09,2020',
		readinglength: 12,
		imageUrl: 'https://geeks-react.netlify.app/static/media/blogpost-1.b7812866b40bb29d8dfb.jpg',
		content: blogContent
	},
	{
		id: 7,

		category: 'Company',
		title: 'How to become modern Stack Developer in 2020',
		details:
			'At beatae non sit dicta similique perspiciatis facilis veritatis quam. Recusandae, corrupti?',
		authorname: 'Reva Yokk',

		aboutauthor: 'Marketing Manager',
		postedon: 'September 10,2020',
		readinglength: 10,
		imageUrl: 'https://geeks-react.netlify.app/static/media/blogpost-1.b7812866b40bb29d8dfb.jpg',
		content: blogContent
	},
	{
		id: 8,
		category: 'Company',
		title: 'How to Become a Data Scientist?',
		details:
			'Nulla voluptate in facere saepe est alias et iste, accusantium sint enim!',
		authorname: 'Miron Sulla',
		aboutauthor: 'Marketing Manager',
		postedon: 'September 05,2020',
		readinglength: 20,
		imageUrl: 'https://geeks-react.netlify.app/static/media/blogpost-6.ee7b705f75e359b1a78e.jpg',
		content: blogContent
	},
	{
		id: 9,
		category: 'Workshop',
		title: 'How to become WebDesinger?',
		details:
			'Vero expedita voluptatibus cumque sunt ullam cum natus, vitae provident debitis pariatur?',
		authorname: 'Lucy Kolin',
		postedon: 'September 05,2020',
		readinglength: 20,
		imageUrl: 'https://geeks-react.netlify.app/static/media/blogpost-1.b7812866b40bb29d8dfb.jpg',
		content: blogContent
	},


];

export default BlogArticles;
