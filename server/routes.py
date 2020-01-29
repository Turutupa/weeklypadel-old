from flask import Flask, send_from_directory


def handler(app):
    @app.route("/")
    def serve():
        """serves React App"""
        return send_from_directory(app.static_folder, "index.html")

    @app.route('/hello')
    def hello():
        return send_from_directory(app.static_folder, "index.html")

    @app.route('/user/<username>')
    def show_user_profile(username):
        # show the user profile for that user
        return 'User %s' % escape(username)

    @app.route('/post/<int:post_id>')
    def show_post(post_id):
        # show the post with the given id, the id is an integer
        return 'Post %d' % post_id

    @app.route('/path/<path:subpath>')
    def show_subpath(subpath):
        # show the subpath after /path/
        return 'Subpath %s' % escape(subpath)

    # with app.test_request_context():
    #     url_for('index', filename='../client/build')