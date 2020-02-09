from flask import Flask, render_template, request, jsonify
import requests


def handler(app):
    @app.route('/')
    def index():
        return render_template('index.html', token='Hello flask+react')

    @app.route('/get_everything')
    def get_everything():
        url = 'https://sfkj7v358a.execute-api.eu-west-1.amazonaws.com/weeklypadel'
        api_call = requests.get(url).json()
        api_call['Content-Type'] = 'application/json'
        api_call['Access-Control-Allow-Origin'] = '*'

        print('api call:', api_call)
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'api_call': api_call
        }

    @app.route('/v1/api/game/<int:game_id>')
    def get_game_details(game_id):
        print('Request method', request.method)
        print('this has to do something')
        response = {
            "statusCode": 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
        return response

    @app.route('/v1/api/create/', methods=['POST'])
    def create_weekly_reminder():
        print('at least here')
        print('Request data', request.get_json())
        # print('data', request.form.get('partyName'),
        #       request.form.get('notificationDate'))

        return jsonify({
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "data": request.json
        })

    # @app.route('/user/<username>')
    # def show_user_profile(username):
    #     # show the user profile for that user
    #     return 'User %s' % escape(username)

    # @app.route('/post/<int:post_id>')
    # def show_post(post_id):
    #     # show the post with the given id, the id is an integer
    #     return 'Post %d' % post_id

    # @app.route('/path/<path:subpath>')
    # def show_subpath(subpath):
    #     # show the subpath after /path/
    #     return 'Subpath %s' % escape(subpath)

    # with app.test_request_context():
    #     url_for('index', filename='../client/build')